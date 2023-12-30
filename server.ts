import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { createHandler } from 'graphql-http/lib/use/express';
import expressPlayground from 'graphql-playground-middleware-express';
import { graphqlSchema } from "./graphql/schema";
import { routes } from  './routes/index';
import { requireRedirect } from './helpers/httpsHelper';
import bodyParser from 'body-parser';
import { createRandomAuthors } from './database/seeds/faker';


dotenv.config();
const server = (async ()=>{
  const server: Application = express();

   //connect to mongodb
   const uri = `${process.env.DB_URI}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  try{
    await mongoose.connect(uri)
  }catch(error) {
    console.log('Error connecting to Database');
  }

  // seeder
  // createRandomAuthors(true);

  server.use(cors())
  // server.use(express.json());
  server.use(bodyParser.json());
  server.use(express.urlencoded({ extended: true }));

  const handler = createHandler({ schema: graphqlSchema });
  server.use('/graphql', handler);
  server.get('/playground', expressPlayground({ endpoint: '/graphql' }));
  server.use('/api', routes(server).apiRoutes);

  const nodeEnv = process.env.NODE_ENV || "local";
  // Redirect http to https
  server.use((req, res, next: () => void ) => {
    if (requireRedirect(req, nodeEnv)) {
        return res.redirect(301, `https://${req.headers.host}${req.url}`);
    } else {
        return next();
    }
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (): void => {
    console.log('server started on '+ port);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
    // Optionally terminate the process or handle it appropriately
  });
})();


export default server;

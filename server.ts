import express, { Application } from 'express';
import cors from 'cors';
import { createHandler } from 'graphql-http/lib/use/express';
const expressPlayground =
  require('graphql-playground-middleware-express').default;
import { graphqlSchema } from "./graphql/schema";
import { routes } from  './routes/index';
import { requireRedirect } from './helpers/httpsHelper';
import bodyParser from 'body-parser';

const server: Application = express();

server.use(cors())
// server.use(express.json());
server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true }));

const handler = createHandler({ schema: graphqlSchema });
server.use('/graphql', handler);
server.get('/playground', expressPlayground({ endpoint: '/graphql' }));
const {apiRoutes} = routes(server);
server.use('/api', apiRoutes);

const nodeEnv = process.env.NODE_ENV || "local";
// Redirect http to https
server.use((req, res, next: () => void ) => {
  if (requireRedirect(req, nodeEnv)) {
      return res.redirect(301, `https://${req.headers.host}${req.url}`);
  } else {
      return next();
  }
});


//connect to mongodb



const port = process.env.PORT || 3000;
server.listen(port, (): void => {
  console.log('server started on '+ port);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  // Optionally terminate the process or handle it appropriately
});

export default server;

import express, { Request, Response, NextFunction } from 'express';
export const authorRouter = express.Router();

// export const authorRoutes = () => {
//   console.log('AAA')
//   router.get('/create', (req, res, next) => {
//     res.send({type: 'create endpoint'});
//     return next();
//   });  
// }

authorRouter.get('/create', (req: Request, res: Response, next:  NextFunction) => {
  res.send({type: 'create endpoint'});
  return next();
}); 
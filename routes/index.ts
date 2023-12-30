"use strict";
import express, { Application } from 'express';
import { authorRouter } from './author';

export const router = express.Router();
export const routes = (server: Application) => {
    router.get('/', (req, res, next) => {
        res.send({
            status: 200,
            data: []
        });
        return next();
    });
    server.use('/api/authors', authorRouter);
    return { apiRoutes: router };
};
//# sourceMappingURL=index.js.map
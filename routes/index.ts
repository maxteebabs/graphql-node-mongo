"use strict";
import express, { Application } from 'express';

export const router = express.Router();
export const routes = (_: Application) => {
    router.get('/', (req, res, next) => {
        res.send({
            status: 200,
            data: []
        });
        return next();
    });
    return { apiRoutes: router };
};
//# sourceMappingURL=index.js.map
'use strict';

import { Request } from "express";

const httpAllowed = new Set(['local', 'local_test', 'docker_dev']);
export const requireRedirect = (req: Request, nodeEnv: string) => {
    const protocol = req.header('X-Forwarded-Proto');
    return protocol === 'http' && !httpAllowed.has(nodeEnv);
};
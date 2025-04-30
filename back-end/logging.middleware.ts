import { Request, Response, NextFunction } from 'express';
import { logger } from './util/logger';

export const logSecurityEvents = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;

        const isSecurityEvent =
            ['/users/login', '/users/signup'].includes(req.path) ||
            [401, 403].includes(res.statusCode);

        if (isSecurityEvent) {
            logger.info({
                event: 'security_event',
                method: req.method,
                path: req.path,
                status: res.statusCode,
                durationMs: duration,
                user: req.body?.email || 'unknown',
            });
        }
    });

    next();
};

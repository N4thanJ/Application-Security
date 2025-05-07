import * as dotenv from 'dotenv';
import cors from 'cors';
import { userRouter } from './controller/user.routes';
import { itemRouter } from './controller/item.routes';
import { shoppingcartRouter } from './controller/shoppingcart.routes';
import { nutritionlabelRouter } from './controller/nutritionlabel.routes';
import express, { Request, Response, NextFunction } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { expressjwt } from 'express-jwt';
import helmet from 'helmet';
import pino from 'pino';
import pinoHttp from 'pino-http';

const app = express();

app.use(express.json());

const logThrottleCache = new Map();
const THROTTLE_INTERVAL_MS = 5000;

function shouldLog304(url: any) {
    const now = Date.now();
    const lastLogged = logThrottleCache.get(url) || 0;
    if (now - lastLogged > THROTTLE_INTERVAL_MS) {
        logThrottleCache.set(url, now);
        return true;
    }
    return false;
}

const logToFile = pino(
    pino.transport({
        target: 'pino-pretty',
        options: { singleLine: true, destination: 'logs/app.log' },
    })
);

app.use(
    pinoHttp({
        logger: logToFile,
        customSuccessMessage(req, res) {
            return `${req.method} ${req.url} ${res.statusCode}`;
        },
        customLogLevel(req, res, err) {
            if (res.statusCode >= 500 || err) return 'error';
            if (res.statusCode >= 400) return 'warn';
            if (res.statusCode === 304) {
                return shouldLog304(req.url) ? 'debug' : 'silent';
            }
            return 'info';
        },
        serializers: {
            req(req) {
                const { password, ...safeBody } = req.raw.body || {};
                return {
                    id: req.id,
                    method: req.method,
                    url: req.url,
                    timestamp: new Date().toISOString(),
                    body: safeBody,
                };
            },
            res(res) {
                return {
                    statusCode: res.statusCode,
                };
            },
        },
    })
);

app.use(helmet());
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors({ origin: 'http://localhost:8000' }));

// Swagger docs
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Shoppingcarts API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256'],
    }).unless((req) => {
        return (
            (req.method === 'GET' && req.path === '/items') ||
            (req.method === 'GET' && req.path === '/nutritionlabels') ||
            ['/api-docs/', '/users/login', '/users/signup', '/status'].includes(req.path)
        );
    })
);

app.use('/users', userRouter);
app.use('/shoppingcarts', shoppingcartRouter);
app.use('/nutritionlabels', nutritionlabelRouter);
app.use('/items', itemRouter);

app.get('/status', (_req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: err.message });
    } else if (err.name === 'CoursesError') {
        res.status(400).json({ status: 'domain error', message: err.message });
    } else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});

import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { userRouter } from './controller/user.routes';
import { itemRouter } from './controller/item.routes';
import { shoppingcartRouter } from './controller/shoppingcart.routes';
import { nutritionlabelRouter } from './controller/nutritionlabel.routes';
import { Request, Response, NextFunction } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { expressjwt } from 'express-jwt';
import helmet from 'helmet';

const app = express();
app.use(helmet());
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(express.json());

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

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
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

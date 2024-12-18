import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { userRouter } from './controller/user.routes';
import { itemRouter } from './controller/item.routes';
import { shoppingcartRouter } from './controller/shoppingcart.routes';
import { nutritionlabelRouter } from './controller/nutritionlabel.routes';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { expressjwt } from 'express-jwt';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(express.json());

app.use('/users', userRouter);
app.use('/shoppingcarts', shoppingcartRouter);
app.use('/nutritionlabels', nutritionlabelRouter);
app.use('/items', itemRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

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
    }).unless({
        path: ['/api-docs/', '/users/login', '/users/signup'],
    })
);

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});

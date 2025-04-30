/**
 * @swagger
 * tags:
 *   - name: Shoppingcarts
 *     description: Operations for managing shopping carts
 * components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      ShoppingCart:
 *        type: object
 *        description: Represents a shopping cart for storing grocery items
 *        properties:
 *          id:
 *            type: integer
 *            format: int64
 *            description: Unique identifier for the shopping cart
 *            example: 1
 *          name:
 *            type: string
 *            description: Name of the shopping cart
 *            example: "Weekly Groceries"
 *            minLength: 1
 *            maxLength: 100
 *          deliveryDate:
 *            type: string
 *            format: date
 *            description: Requested delivery date for the shopping cart
 *            example: "2026-11-01"
 *          items:
 *            type: array
 *            description: List of items in the shopping cart
 *            items:
 *              $ref: '#/components/schemas/Item'
 *      ShoppingCartInput:
 *        type: object
 *        description: Input schema for creating a new shopping cart
 *        required:
 *          - name
 *          - deliveryDate
 *        properties:
 *          name:
 *            type: string
 *            description: Name of the shopping cart
 *            example: "Weekly Groceries"
 *            minLength: 1
 *            maxLength: 100
 *          deliveryDate:
 *            type: string
 *            format: date
 *            description: Requested delivery date for the shopping cart
 *            example: "2026-11-01"
 *            pattern: "^\\d{4}-\\d{2}-\\d{2}$"
 */

import express, { NextFunction, Request, Response } from 'express';
import shoppingcartService from '../service/shoppingcart.service';
import { Role } from '@prisma/client';
import { logger } from '../util/logger';

const shoppingcartRouter = express.Router();

interface AuthenticatedRequest extends Request {
    auth: {
        role: Role;
        email: string;
    };
}

/**
 * @swagger
 * /shoppingcarts:
 *   get:
 *     summary: Get a list of all shopping carts
 *     description: Retrieve a list of all shopping carts with their items and delivery dates
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Shoppingcarts
 *     responses:
 *       200:
 *         description: List of shopping carts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShoppingCart'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error occurred"
 */

shoppingcartRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { role } = (req as AuthenticatedRequest).auth;
        logger.info({ event: 'get_all_shoppingcarts_attempt', role });

        if (role && role !== 'admin') {
            logger.warn({ event: 'get_all_shoppingcarts_unauthorized', role });
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const shoppingcarts = await shoppingcartService.getAllShoppingcarts();

        res.status(200).json(shoppingcarts);
        logger.info({ event: 'get_all_shoppingcarts_success', cartCount: shoppingcarts.length });
    } catch (error) {
        logger.error({ event: 'get_all_shoppingcarts_error', message: (error as Error).message });
        res.status(500).json({ message: (error as Error).message });
    }
});

/**
 * @swagger
 * /shoppingcarts/{id}:
 *   get:
 *     summary: Get a shopping cart by ID
 *     description: Retrieve a specific shopping cart by its unique ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Shoppingcarts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the shopping cart to retrieve
 *         example: 1
 *     responses:
 *       200:
 *         description: Shopping cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingCart'
 *       404:
 *         description: Shopping cart not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Shopping cart not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error occurred"
 */

shoppingcartRouter.get(
    '/:shoppingcartId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const shoppingcartId = parseInt(req.params.shoppingcartId);
            logger.info({ event: 'get_shoppingcart_by_id_attempt', shoppingcartId });

            const shoppingcart = await shoppingcartService.getShoppingcartById(shoppingcartId);

            res.status(200).json(shoppingcart);
            logger.info({ event: 'get_shoppingcart_by_id_success', shoppingcartId });
        } catch (error) {
            logger.error({
                event: 'get_shoppingcart_by_id_error',
                shoppingcartId: req.params.shoppingcartId,
                message: (error as Error).message,
            });
            res.status(500).json({ message: (error as Error).message });
        }
    }
);

/**
 * @swagger
 * /shoppingcarts:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new shopping cart
 *     description: Create a new shopping cart with a name and delivery date
 *     tags:
 *       - Shoppingcarts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShoppingCartInput'
 *     responses:
 *       201:
 *         description: Shopping cart created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingCart'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid shopping cart data"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error occurred"
 */

shoppingcartRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { role, email } = (req as AuthenticatedRequest).auth;
        logger.info({
            event: 'create_shoppingcart_attempt',
            role,
            email,
            cartName: req.body.name,
        });

        if (role && role !== 'admin') {
            logger.warn({
                event: 'create_shoppingcart_unauthorized',
                role,
                email,
            });
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const shoppingcart = await shoppingcartService.createShoppingcart(req.body, email);

        res.status(201).json(shoppingcart);
        logger.info({
            event: 'create_shoppingcart_success',
            cartId: shoppingcart.getId(),
            cartName: shoppingcart.getName(),
            email: shoppingcart.getUser()?.getEmail(
                
            ),
        });
    } catch (error) {
        logger.error({
            event: 'create_shoppingcart_error',
            message: (error as Error).message,
        });
        res.status(500).json({ message: (error as Error).message });
    }
});

/**
 * @swagger
 * /shoppingcarts/addItem/{itemId}/{shoppingcartId}:
 *   post:
 *     summary: Add an item to a shopping cart
 *     description: Add a specific item to an existing shopping cart
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Shoppingcarts
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the item to add to the cart
 *         example: 1
 *       - in: path
 *         name: shoppingcartId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the shopping cart to add the item to
 *         example: 1
 *     responses:
 *       200:
 *         description: Item successfully added to shopping cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingCart'
 *       404:
 *         description: Shopping cart or item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Shopping cart or item not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error occurred"
 */

shoppingcartRouter.post(
    '/addItem/:itemId/:shoppingcartId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const itemId = parseInt(req.params.itemId);
            const shoppingcartId = parseInt(req.params.shoppingcartId);

            logger.info({
                event: 'add_item_to_shoppingcart_attempt',
                itemId,
                shoppingcartId,
            });

            const shoppingcart = await shoppingcartService.addItemToShoppingcart({
                itemId,
                shoppingcartId,
            });

            res.status(200).json(shoppingcart);
            logger.info({
                event: 'add_item_to_shoppingcart_success',
                itemId,
                shoppingcartId,
            });
        } catch (error) {
            logger.error({
                event: 'add_item_to_shoppingcart_error',
                itemId: req.params.itemId,
                shoppingcartId: req.params.shoppingcartId,
                message: (error as Error).message,
            });
            res.status(500).json({ message: (error as Error).message });
        }
    }
);

/**
 * @swagger
 * /shoppingcarts/removeItem/{itemId}/{shoppingcartId}:
 *   delete:
 *     summary: Remove a complete item from a shopping cart
 *     description: Remove a complete specific item from an existing shopping cart
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Shoppingcarts
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the item to remove from the cart
 *         example: 1
 *       - in: path
 *         name: shoppingcartId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the shopping cart to remove the item from
 *         example: 1
 *     responses:
 *       200:
 *         description: Item successfully removed from shopping cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingCart'
 *       404:
 *         description: Shopping cart or item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Shopping cart or item not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error occurred"
 */

shoppingcartRouter.delete(
    '/deleteItem/:itemId/:shoppingcartId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const itemId = parseInt(req.params.itemId);
            const shoppingcartId = parseInt(req.params.shoppingcartId);

            logger.info({
                event: 'delete_item_from_shoppingcart_attempt',
                itemId,
                shoppingcartId,
            });

            const shoppingcart = await shoppingcartService.removeItemFromShoppingcart(
                itemId,
                shoppingcartId
            );

            res.status(200).json(shoppingcart);
            logger.info({
                event: 'delete_item_from_shoppingcart_success',
                itemId,
                shoppingcartId,
            });
        } catch (error) {
            logger.error({
                event: 'delete_item_from_shoppingcart_error',
                itemId: req.params.itemId,
                shoppingcartId: req.params.shoppingcartId,
                message: (error as Error).message,
            });
            res.status(500).json({ message: (error as Error).message });
        }
    }
);

/**
 * @swagger
 * /shoppingcarts/removeAnItem/{itemId}/{shoppingcartId}:
 *   delete:
 *     summary: Remove a single item from a shopping cart
 *     description: Remove a specific item from an existing shopping cart
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Shoppingcarts
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the item to remove from the cart
 *         example: 1
 *       - in: path
 *         name: shoppingcartId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the shopping cart to remove the item from
 *         example: 1
 *     responses:
 *       200:
 *         description: Item successfully removed from shopping cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingCart'
 *       404:
 *         description: Shopping cart or item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Shopping cart or item not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error occurred"
 */

shoppingcartRouter.delete(
    '/removeAnItem/:itemId/:shoppingcartId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const itemId = parseInt(req.params.itemId);
            const shoppingcartId = parseInt(req.params.shoppingcartId);

            logger.info({
                event: 'remove_an_item_from_shoppingcart_attempt',
                itemId,
                shoppingcartId,
            });

            const shoppingcart = await shoppingcartService.removeAnItemFromShoppingcart(
                itemId,
                shoppingcartId
            );

            res.status(200).json(shoppingcart);
            logger.info({
                event: 'remove_an_item_from_shoppingcart_success',
                itemId,
                shoppingcartId,
            });
        } catch (error) {
            logger.error({
                event: 'remove_an_item_from_shoppingcart_error',
                itemId: req.params.itemId,
                shoppingcartId: req.params.shoppingcartId,
                message: (error as Error).message,
            });
            res.status(500).json({ message: (error as Error).message });
        }
    }
);

/**
 * @swagger
 * /shoppingcarts/updateQuantity/{itemId}/{shoppingcartId}/{quantity}:
 *   put:
 *     summary: Update the quantity of an item in a shopping cart
 *     description: Update the quantity of a specific item in an existing shopping cart
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Shoppingcarts
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the item to update the quantity
 *         example: 1
 *       - in: path
 *         name: shoppingcartId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the shopping cart to update the item quantity
 *         example: 1
 *       - in: path
 *         name: quantity
 *         required: true
 *         schema:
 *           type: integer
 *         description: New quantity of the item
 *         example: 5
 *     responses:
 *       200:
 *         description: Item quantity successfully updated in shopping cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingCart'
 *       404:
 *         description: Shopping cart or item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Shopping cart or item not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error occurred"
 */

shoppingcartRouter.put(
    '/updateQuantity/:itemId/:shoppingcartId/:quantity',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const itemId = parseInt(req.params.itemId);
            const shoppingcartId = parseInt(req.params.shoppingcartId);
            const quantity = parseInt(req.params.quantity);

            logger.info({
                event: 'update_item_quantity_in_shoppingcart_attempt',
                itemId,
                shoppingcartId,
                quantity,
            });

            const shoppingcart = await shoppingcartService.updateItemQuantityInShoppingcart(
                itemId,
                shoppingcartId,
                quantity
            );

            res.status(200).json(shoppingcart);
            logger.info({
                event: 'update_item_quantity_in_shoppingcart_success',
                itemId,
                shoppingcartId,
                quantity,
            });
        } catch (error) {
            logger.error({
                event: 'update_item_quantity_in_shoppingcart_error',
                itemId: req.params.itemId,
                shoppingcartId: req.params.shoppingcartId,
                quantity: req.params.quantity,
                message: (error as Error).message,
            });
            res.status(500).json({ message: (error as Error).message });
        }
    }
);

/**
 * @swagger
 * /shoppingcarts/{shoppingcartId}:
 *   delete:
 *     summary: Delete a shopping cart by ID
 *     description: Delete a specific shopping cart by its unique ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Shoppingcarts
 *     parameters:
 *       - in: path
 *         name: shoppingcartId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the shopping cart to delete
 *         example: 1
 *     responses:
 *       200:
 *         description: Shopping cart deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Shopping cart deleted successfully"
 *       404:
 *         description: Shopping cart not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Shopping cart not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error occurred"
 */

shoppingcartRouter.delete(
    '/:shoppingcartId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const shoppingcartId = parseInt(req.params.shoppingcartId);
            logger.info({ event: 'delete_shoppingcart_attempt', shoppingcartId });

            await shoppingcartService.deleteShoppingcart(shoppingcartId);

            res.status(200).json({ message: 'Shopping cart deleted successfully' });
            logger.info({ event: 'delete_shoppingcart_success', shoppingcartId });
        } catch (error) {
            logger.error({
                event: 'delete_shoppingcart_error',
                shoppingcartId: req.params.shoppingcartId,
                message: (error as Error).message,
            });
            res.status(500).json({ message: (error as Error).message });
        }
    }
);

export { shoppingcartRouter };

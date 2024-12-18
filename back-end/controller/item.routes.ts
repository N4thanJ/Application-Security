/**
 * @swagger
 * tags:
 *   - name: Items
 *     description: Operations for managing items in the store
 *
 * components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Category:
 *        type: string
 *        enum: [fruits, vegetables, dairy]
 *        description: The category of the item
 *        example: fruits
 *      Item:
 *        type: object
 *        description: Represents a grocery store item with its details
 *        properties:
 *          id:
 *            type: integer
 *            format: int64
 *            description: Unique identifier for the item
 *            example: 1
 *          name:
 *            type: string
 *            description: Item name
 *            example: "Orange"
 *          price:
 *            type: number
 *            description: Item's price in dollars
 *            example: 1.99
 *            minimum: 0
 *          pathToImage:
 *            type: string
 *            description: Path to the item's image in the server
 *            example: "/images/orange.png"
 *          category:
 *            $ref: '#/components/schemas/Category'
 *          Nutritionlabel:
 *            $ref: '#/components/schemas/NutritionLabelInput'
 *      ItemInput:
 *        type: object
 *        description: Input schema for creating a new item
 *        required:
 *          - name
 *          - price
 *          - pathToImage
 *          - category
 *        properties:
 *          name:
 *            type: string
 *            description: Item name
 *            example: "Orange"
 *            minLength: 1
 *            maxLength: 100
 *          price:
 *            type: number
 *            description: Item's price in dollars
 *            example: 1.99
 *            minimum: 0
 *          pathToImage:
 *            type: string
 *            description: Path to the item's image
 *            example: "/images/orange.png"
 *            pattern: "^/images/.*\\.(jpg|jpeg|png)$"
 *          category:
 *            $ref: '#/components/schemas/Category'
 *      NutritionLabelInput:
 *        type: object
 *        description: Nutritional information for a food item
 *        required:
 *          - energy
 *          - fat
 *          - saturatedFats
 *          - carbohydrates
 *          - sugar
 *          - protein
 *          - salts
 *        properties:
 *          energy:
 *            type: number
 *            description: Energy content in kcal
 *            example: 50
 *            minimum: 0
 *          fat:
 *            type: number
 *            description: Total fat content in grams
 *            example: 0.3
 *            minimum: 0
 *          saturatedFats:
 *            type: number
 *            description: Saturated fats content in grams
 *            example: 0.1
 *            minimum: 0
 *          carbohydrates:
 *            type: number
 *            description: Total carbohydrates in grams
 *            example: 12
 *            minimum: 0
 *          sugar:
 *            type: number
 *            description: Sugar content in grams
 *            example: 10
 *            minimum: 0
 *          protein:
 *            type: number
 *            description: Protein content in grams
 *            example: 0.9
 *            minimum: 0
 *          salts:
 *            type: number
 *            description: Salt content in grams
 *            example: 0.01
 *            minimum: 0
 */

import express, { NextFunction, Request, Response } from 'express';
import itemService from '../service/item.service';

const itemRouter = express.Router();

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get a list of all items
 *     description: Retrieve a list of all grocery items available in the store
 *     tags:
 *       - Items
 *     responses:
 *       200:
 *         description: A list of items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
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

itemRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const items = await itemService.getAllItems();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

/**
 * @swagger
 * /items/{itemId}:
 *   get:
 *     summary: Get an item by ID
 *     description: Retrieve detailed information about a specific item using its ID
 *     tags:
 *       - Items
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the item to retrieve
 *         example: 1
 *     responses:
 *       200:
 *         description: Item retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

itemRouter.get('/:itemId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const itemId = parseInt(req.params.itemId);
        const item = await itemService.getItemById(itemId);
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     description: Add a new item to the store's inventory
 *     tags:
 *       - Items
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemInput'
 *     responses:
 *       201:
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input data"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

itemRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const item = await itemService.createItem(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

/**
 * @swagger
 * /items/{itemId}/addNutritionlabel:
 *   post:
 *     summary: Add a nutritionlabel to an item
 *     description: Add or update nutritional information for a specific item
 *     tags:
 *       - Items
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the item to update
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NutritionLabelInput'
 *     responses:
 *       200:
 *         description: Nutritionlabel added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item not found"
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid nutritionlabel data"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

itemRouter.post(
    '/:itemId/addNutritionlabel',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const itemId = parseInt(req.params.itemId);
            const nutritionlabel = req.body;

            const item = await itemService.addNutritionLabelToItem(itemId, nutritionlabel);
            res.status(200).json(item);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
);

/**
 * @swagger
 * /items/{itemId}:
 *   delete:
 *     summary: Delete an item by ID
 *     description: Remove a specific item from the store's inventory
 *     tags:
 *       - Items
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the item to delete
 *         example: 1
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item successfully deleted"
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item not found"
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

itemRouter.delete('/:itemId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const itemId = parseInt(req.params.itemId);
        const message = await itemService.deleteItemById(itemId);

        res.status(200).json({ message });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

export { itemRouter };

/**
 * @swagger
 * tags:
 *   - name: Nutritionlabels
 *     description: Operations for managing nutrition labels
 * components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      NutritionLabel:
 *        type: object
 *        description: Represents detailed nutritional information for a food item
 *        properties:
 *          id:
 *            type: integer
 *            format: int64
 *            description: Unique identifier for the nutritionlabel
 *            example: 1
 *          energy:
 *            type: number
 *            description: Energy content in kcal
 *            minimum: 0
 *            example: 50
 *          fat:
 *            type: number
 *            description: Fat content in grams
 *            minimum: 0
 *            example: 0.3
 *          saturatedFats:
 *            type: number
 *            description: Saturated fats content in grams
 *            minimum: 0
 *            example: 0.1
 *          carbohydrates:
 *            type: number
 *            description: Carbohydrates content in grams
 *            minimum: 0
 *            example: 12
 *          sugar:
 *            type: number
 *            description: Sugar content in grams
 *            minimum: 0
 *            example: 10
 *          protein:
 *            type: number
 *            description: Protein content in grams
 *            minimum: 0
 *            example: 0.9
 *          salts:
 *            type: number
 *            description: Salt content in grams
 *            minimum: 0
 *            example: 0.01
 *      NutritionLabelInput:
 *        type: object
 *        description: Input schema for creating a new nutritionlabel
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
 *            minimum: 0
 *            example: 50
 *          fat:
 *            type: number
 *            description: Fat content in grams
 *            minimum: 0
 *            example: 0.3
 *          saturatedFats:
 *            type: number
 *            description: Saturated fats content in grams
 *            minimum: 0
 *            example: 0.1
 *          carbohydrates:
 *            type: number
 *            description: Carbohydrates content in grams
 *            minimum: 0
 *            example: 12
 *          sugar:
 *            type: number
 *            description: Sugar content in grams
 *            minimum: 0
 *            example: 10
 *          protein:
 *            type: number
 *            description: Protein content in grams
 *            minimum: 0
 *            example: 0.9
 *          salts:
 *            type: number
 *            description: Salt content in grams
 *            minimum: 0
 *            example: 0.01
 */

import express, { NextFunction, Request, Response } from 'express';
import nutritionlabelService from '../service/nutritionlabel.service';
import { Role } from '../types';

const nutritionlabelRouter = express.Router();

interface AuthenticatedRequest extends Request {
    auth: {
        role: Role;
    };
}

/**
 * @swagger
 * /nutritionlabels:
 *   get:
 *     summary: Get a list of all nutrition labels
 *     description: Retrieve a list of all nutrition labels in the system
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Nutritionlabels
 *     responses:
 *       200:
 *         description: List of nutrition labels retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NutritionLabel'
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

nutritionlabelRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const nutritionlabels = await nutritionlabelService.getAllNutritionlabels();
        res.status(200).json(nutritionlabels);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

/**
 * @swagger
 * /nutritionlabels:
 *   post:
 *     summary: Create a new nutritionlabel
 *     description: Create a new nutritionlabel with detailed nutritional information
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Nutritionlabels
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NutritionLabelInput'
 *     responses:
 *       201:
 *         description: Nutritionlabel created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NutritionLabel'
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
 *                   example: "Internal server error occurred"
 */

nutritionlabelRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { role } = (req as AuthenticatedRequest).auth;
        const nutritionlabel = req.body;
        const newNutritionlabel = await nutritionlabelService.createNutritionlabel(
            role,
            nutritionlabel
        );
        res.status(201).json(newNutritionlabel);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

export { nutritionlabelRouter };

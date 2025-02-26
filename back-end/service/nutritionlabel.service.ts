import { Nutritionlabel } from '../model/nutritionlabel';
import nutritionlabelDb from '../repository/nutritionlabel.db';
import { NutritionlabelInput, Role } from '../types';

const getAllNutritionlabels = async (): Promise<Nutritionlabel[]> => {
    const nutritionLabels = await nutritionlabelDb.getAll();
    if (!nutritionLabels) {
        throw new Error('No nutrition labels found');
    }

    return nutritionLabels;
};

const createNutritionlabel = async (
    role: Role,
    nutritionlabel: NutritionlabelInput
): Promise<Nutritionlabel> => {
    if (role !== 'admin') {
        throw new Error('You are not authorized to create nutritionlabels');
    }

    const newNutritionlabel = new Nutritionlabel(nutritionlabel);
    const createdNutritionLabel = await nutritionlabelDb.create(newNutritionlabel);
    if (!createdNutritionLabel) {
        throw new Error('Could not create nutritionlabel');
    }

    return createdNutritionLabel;
};

export default { getAllNutritionlabels, createNutritionlabel };

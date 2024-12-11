import itemDb from '../repository/item.db';
import { Item } from '../model/item';
import { ItemInput, NutritionlabelInput } from '../types';
import { Nutritionlabel } from '../model/nutritionlabel';
import nutritionlabelDb from '../repository/nutritionlabel.db';

const getAllItems = async (): Promise<Item[]> => {
    const items = await itemDb.getAll();
    if (!items) {
        throw new Error('No items found');
    }

    return items;
};

const createItem = async (item: ItemInput): Promise<Item> => {
    const createdItem = await itemDb.create(new Item(item));
    if (!createdItem) {
        throw new Error('Item could not be created');
    }

    return createdItem;
};

const addNutritionLabelToItem = async (
    itemId: number,
    nutritionlabel: NutritionlabelInput
): Promise<Item> => {
    const item = await itemDb.getById(itemId);

    if (!item) {
        throw new Error('Item not found');
    }

    const createdNutritionlabel = await nutritionlabelDb.create(new Nutritionlabel(nutritionlabel));

    if (!createdNutritionlabel) {
        throw new Error('Nutritionlabel could not be created');
    }

    return await itemDb.addNutritionlabel(item, createdNutritionlabel);
};

const getItemById = async (itemId: number): Promise<Item> => {
    const item = await itemDb.getById(itemId);
    if (!item) {
        throw new Error('Item not found');
    }

    return item;
};

const deleteItemById = async (itemId: number): Promise<string> => {
    const item = await itemDb.getById(itemId);

    if (!item) {
        throw new Error(`Item with id ${itemId} not found`);
    }

    return await itemDb.deleteItem(itemId);
};

export default {
    getAllItems,
    createItem,
    addNutritionLabelToItem,
    getItemById,
    deleteItemById,
};

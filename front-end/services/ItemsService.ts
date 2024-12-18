import { Item, Nutritionlabel } from '@types';

const getAllItems = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/items', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const getItemById = async (token: string, itemId: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/items/${itemId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

const addItemToCart = async (token: string, itemId: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/addItem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId }),
    });
};

const addNutritionlabelToItem = async (
    token: string,
    itemId: number,
    nutritionLabel: Nutritionlabel
) => {
    try {
        return fetch(process.env.NEXT_PUBLIC_API_URL + `/items/${itemId}/addNutritionlabel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(nutritionLabel),
        });
    } catch (error) {
        console.error(error);
    }
};

const addItem = async (token: string, item: Item) => {
    try {
        return fetch(process.env.NEXT_PUBLIC_API_URL + '/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(item),
        });
    } catch (error) {
        console.error(error);
    }
};

const deleteItem = async (token: string, itemId: number) => {
    try {
        return fetch(process.env.NEXT_PUBLIC_API_URL + `/items/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error(error);
    }
};

const ItemsService = {
    getAllItems,
    getItemById,
    addItemToCart,
    addNutritionlabelToItem,
    addItem,
    deleteItem,
};

export default ItemsService;

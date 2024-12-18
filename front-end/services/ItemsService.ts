import { Item, Nutritionlabel } from '@types';

const getAllItems = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/items', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('loggedInUser')}`,
        },
    });
};

const getItemById = async (itemId: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/items/${itemId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('loggedInUser')}`,
        },
    });
};

const addItemToCart = async (itemId: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/addItem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('loggedInUser')}`,
        },
        body: JSON.stringify({ itemId }),
    });
};

const addNutritionlabelToItem = async (itemId: number, nutritionLabel: Nutritionlabel) => {
    try {
        return fetch(process.env.NEXT_PUBLIC_API_URL + `/items/${itemId}/addNutritionlabel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nutritionLabel),
        });
    } catch (error) {
        console.error(error);
    }
};

const addItem = async (item: Item) => {
    try {
        return fetch(process.env.NEXT_PUBLIC_API_URL + '/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        });
    } catch (error) {
        console.error(error);
    }
};

const deleteItem = async (itemId: number) => {
    try {
        return fetch(process.env.NEXT_PUBLIC_API_URL + `/items/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
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

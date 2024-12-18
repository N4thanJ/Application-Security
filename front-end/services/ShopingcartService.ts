import { Shoppingcart } from '@types';

const addShoppingcart = async (token: string, shoppingcart: Shoppingcart) => {
    try {
        return fetch(process.env.NEXT_PUBLIC_API_URL + '/shoppingcarts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(shoppingcart),
        });
    } catch (error) {
        console.error(error);
    }
};

const getShoppingcartById = async (token: string, shoppingcartId: string) => {
    try {
        return fetch(process.env.NEXT_PUBLIC_API_URL + `/shoppingcarts/${shoppingcartId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error(error);
    }
};

const deleteItemFromShoppingcart = async (
    token: string,
    itemId: number,
    shoppingcartId: number
) => {
    try {
        return fetch(
            process.env.NEXT_PUBLIC_API_URL +
                `/shoppingcarts/deleteItem/${itemId}/${shoppingcartId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        console.error(error);
    }
};

const removeAnItem = async (token: string, itemId: number, shoppingcartId: number) => {
    try {
        return fetch(
            process.env.NEXT_PUBLIC_API_URL +
                `/shoppingcarts/removeAnItem/${itemId}/${shoppingcartId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        console.error(error);
    }
};

const addItemToShoppingcart = async (token: string, itemId: number, shoppingcartId: number) => {
    try {
        return fetch(
            process.env.NEXT_PUBLIC_API_URL + `/shoppingcarts/addItem/${itemId}/${shoppingcartId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        console.error(error);
    }
};

const updateItemQuantityInShoppingcart = async (
    token: string,
    itemId: number,
    shoppingcartId: number,
    quantity: number
) => {
    try {
        return fetch(
            process.env.NEXT_PUBLIC_API_URL +
                `/shoppingcarts/updateQuantity/${itemId}/${shoppingcartId}/${quantity}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        console.error(error);
    }
};

const deleteShoppingcartById = async (token: string, id: number) => {
    try {
        return fetch(process.env.NEXT_PUBLIC_API_URL + `/shoppingcarts/${id}`, {
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

const ShoppingcartService = {
    addShoppingcart,
    getShoppingcartById,
    deleteItemFromShoppingcart,
    removeAnItem,
    addItemToShoppingcart,
    updateItemQuantityInShoppingcart,
    deleteShoppingcartById,
};

export default ShoppingcartService;

import { Shoppingcart } from '@types';

const addShoppingcart = async (shoppingcart: Shoppingcart) => {
    try {
        return fetch(process.env.NEXT_PUBLIC_API_URL + '/shoppingcarts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('loggedInUser')}`,
            },
            body: JSON.stringify(shoppingcart),
        });
    } catch (error) {
        console.error(error);
    }
};

const getShoppingcartById = async (shoppingcartId: string) => {
    try {
        return fetch(process.env.NEXT_PUBLIC_API_URL + `/shoppingcarts/${shoppingcartId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('loggedInUser')}`,
            },
        });
    } catch (error) {
        console.error(error);
    }
};

const deleteItemFromShoppingcart = async (itemId: number, shoppingcartId: number) => {
    try {
        return fetch(
            process.env.NEXT_PUBLIC_API_URL +
                `/shoppingcarts/deleteItem/${itemId}/${shoppingcartId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('loggedInUser')}`,
                },
            }
        );
    } catch (error) {
        console.error(error);
    }
};

const removeAnItem = async (itemId: number, shoppingcartId: number) => {
    try {
        return fetch(
            process.env.NEXT_PUBLIC_API_URL +
                `/shoppingcarts/removeAnItem/${itemId}/${shoppingcartId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('loggedInUser')}`,
                },
            }
        );
    } catch (error) {
        console.error(error);
    }
};

const addItemToShoppingcart = async (itemId: number, shoppingcartId: number) => {
    try {
        return fetch(
            process.env.NEXT_PUBLIC_API_URL + `/shoppingcarts/addItem/${itemId}/${shoppingcartId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('loggedInUser')}`,
                },
            }
        );
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
};

export default ShoppingcartService;

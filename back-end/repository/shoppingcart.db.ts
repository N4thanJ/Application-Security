import { Item } from '../model/item';
import { Shoppingcart } from '../model/shoppingcart';

const shoppingcarts = [
    new Shoppingcart({
        name: 'Shoppingcart 1',
        deliveryDate: new Date('2025-12-24'),
    }),

    new Shoppingcart({
        name: 'Shoppingcart 2',
        deliveryDate: new Date('2025-9-16'),
    }),
];

const getAll = (): Shoppingcart[] => {
    try {
        return shoppingcarts;
    } catch (error) {
        console.log(error);
        throw new Error('Could not get all shoppingcarts');
    }
};

const create = (shoppingcart: Shoppingcart): Shoppingcart => {
    try {
        if (!shoppingcart) {
            throw new Error('No shoppingcart provided');
        }

        if (shoppingcarts.includes(shoppingcart)) {
            throw new Error('Shoppingcart already exists');
        }

        shoppingcarts.push(shoppingcart);
        return shoppingcart;
    } catch (error) {
        console.log(error);
        throw new Error('Could not create shoppingcart');
    }
};

const addItem = (item: Item, shoppingcart: Shoppingcart): Shoppingcart => {
    try {
        if (!item || !shoppingcart) {
            throw new Error('No item or shoppingcart provided');
        }

        if (!shoppingcarts.includes(shoppingcart)) {
            throw new Error('Shoppingcart does not exist');
        }

        shoppingcart.addItem(item);
        return shoppingcart;
    } catch (error) {
        console.log(error);
        throw new Error('Could not add item to shoppingcart');
    }
};

export default {
    getAll,
    create,
    addItem,
};

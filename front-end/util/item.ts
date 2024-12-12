import { Item } from '@types';

export const calculateTotalOfItem = (item: Item, quantity: number): number => {
    return item.price * quantity;
};

export const calculateTotal = (items: { item: Item; quantity: number }[]): string => {
    return items
        .reduce((total, { item, quantity }) => {
            return total + item.price * quantity;
        }, 0)
        .toFixed(2);
};

import shoppingcartDb from '../repository/shoppingcart.db';
import { Shoppingcart } from '../model/shoppingcart';
import itemDb from '../repository/item.db';
import { Role, ShoppingcartInput } from '../types';
import { User } from '../model/user';
import userDb from '../repository/user.db';

const getAllShoppingcarts = async (): Promise<Shoppingcart[]> => {
    const shoppingcarts = await shoppingcartDb.getAll();
    if (!shoppingcarts) {
        throw new Error('No shoppingcarts found');
    }

    return shoppingcarts;
};

const addItemToShoppingcart = async ({
    itemId,
    shoppingcartId,
}: {
    itemId: number;
    shoppingcartId: number;
}): Promise<Shoppingcart> => {
    const item = await itemDb.getById(itemId);
    const shoppingcart = await shoppingcartDb.getById(shoppingcartId);

    if (!item || item === undefined || !shoppingcart || shoppingcart === undefined) {
        throw new Error('Item or shoppingcart not found');
    }

    await shoppingcartDb.addItemToShoppingcart({ item, shoppingcart });

    return shoppingcart;
};

const createShoppingcart = async (
    shoppingcart: ShoppingcartInput,
    email: string,
    role: Role
): Promise<Shoppingcart> => {
    const newShoppingcart = new Shoppingcart(shoppingcart);

    const user = await userDb.getByEmail({ email });

    if (!user) {
        throw new Error('User not found');
    }

    newShoppingcart.setUser(user);

    const createdShoppingcart = await shoppingcartDb.create(newShoppingcart);

    if (!createdShoppingcart) {
        throw new Error('Could not create shoppingcart');
    }

    return createdShoppingcart;
};

export default { getAllShoppingcarts, addItemToShoppingcart, createShoppingcart };

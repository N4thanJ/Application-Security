import { Shoppingcart } from '../../model/shoppingcart';
import shoppingcartDb from '../../repository/shoppingcart.db';
import shoppingcartService from '../../service/shoppingcart.service';

let mockShoppingcartDbGetAllShoppingcarts: jest.Mock;
let mockCreateShoppingcart: jest.SpyInstance<
    Shoppingcart,
    [{ name: string; deliveryDate: Date }],
    any
>;

beforeEach(() => {
    mockShoppingcartDbGetAllShoppingcarts = jest.fn();
    mockCreateShoppingcart = jest.spyOn(shoppingcartService, 'createShoppingcart');
});

test('given: a filled shoppingcartDb, when: getting all shoppingcarts from shoppingcartService, then: all shoppingcarts are returned', () => {
    // given a filled shoppingcartDb
    const shoppingcarts: Shoppingcart[] = [
        new Shoppingcart({
            name: 'fruit-shopping',
            deliveryDate: new Date('2025-12-24'), // Ensure delivery date is in the future
        }),
    ];

    shoppingcartDb.getAll = mockShoppingcartDbGetAllShoppingcarts.mockReturnValue(shoppingcarts);

    // when getting all shoppingcarts from userService
    shoppingcartService.getAllShoppingcarts();

    // then all shoppingcarts are returned
    expect(mockShoppingcartDbGetAllShoppingcarts).toHaveBeenCalled();
    expect(mockShoppingcartDbGetAllShoppingcarts).toHaveReturnedWith(shoppingcarts);
});

test('given: a valid shoppingcart, when: creating a new shoppingcart, then: the shopping cart is created with those values', () => {
    // given a shoppingcart
    const shoppingcart = new Shoppingcart({ name: 'fruits', deliveryDate: new Date('2025-12-24') });

    // when creating a new shoppingcart
    const createdShoppingCart = shoppingcartService.createShoppingcart({
        name: shoppingcart.getName(),
        deliveryDate: shoppingcart.getDeliveryDate(),
    });

    // then the item is added to the shoppingcart
    expect(mockCreateShoppingcart).toHaveBeenCalled();
    expect(mockCreateShoppingcart).toHaveBeenCalledWith({
        name: shoppingcart.getName(),
        deliveryDate: shoppingcart.getDeliveryDate(),
    });
    expect(createdShoppingCart).toEqual(shoppingcart);
});

import { Item } from '../../model/item';
import { Shoppingcart } from '../../model/shoppingcart';
import shoppingcartDb from '../../repository/shoppingcart.db';
import shoppingcartService from '../../service/shoppingcart.service';

let mockShoppingcartDbGetAllShoppingcarts: jest.Mock;
let mockShoppingcartDbGetShoppingcartById: jest.Mock;
let mockCreateShoppingcart: jest.SpyInstance<
    Shoppingcart,
    [{ name: string; deliveryDate: Date }],
    any
>;

let mockAddItemToShoppingcart: jest.SpyInstance<Item, [Item, Shoppingcart], any>;

beforeEach(() => {
    mockShoppingcartDbGetAllShoppingcarts = jest.fn();
    mockShoppingcartDbGetShoppingcartById = jest.fn();
    mockCreateShoppingcart = jest.spyOn(shoppingcartService, 'createShoppingcart');
    mockAddItemToShoppingcart = jest
        .spyOn(shoppingcartService, 'addItemToShoppingcart')
        .mockImplementation((item, shoppingcart) => {
            shoppingcart.addItem(item);
            return item;
        });
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

test('given: a valid item, when: adding a item to a shoppingcart from shoppingcartService, then: that item is added to the shoppingcart', () => {
    // given a valid item
    const item = new Item({
        name: 'Apple',
        price: 0.49,
        pathToImage: 'public/apple.png',
        category: 'fruits',
    });

    // when adding item to a shoppingcart
    const shoppingcart = new Shoppingcart({ name: 'fruits', deliveryDate: new Date('2025-12-24') });

    const addedItem = shoppingcartService.addItemToShoppingcart(item, shoppingcart);

    // then that item is added to the shoppingcart
    expect(mockAddItemToShoppingcart).toHaveBeenCalled();
    expect(mockAddItemToShoppingcart).toHaveBeenCalledWith(item, shoppingcart);
    expect(addedItem).toEqual(item);
});

test('given: a id of a shoppingcart, when: getting a shoppingcart by id, then: that shoppingcart is returned', () => {
    // given a shoppingcart
    const shoppingcart = new Shoppingcart({ name: 'fruits', deliveryDate: new Date('2025-12-24') });

    // when getting a shoppingcart by id
    const shoppingcartById = shoppingcartService.getShoppingcartById(shoppingcart.getId());

    // then that shoppingcart is returned
    expect(mockShoppingcartDbGetShoppingcartById).toHaveBeenCalled();
    expect(mockShoppingcartDbGetShoppingcartById).toHaveBeenCalledWith(shoppingcart.getId());
    expect(shoppingcartById).toEqual(shoppingcart);
});

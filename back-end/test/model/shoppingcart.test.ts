import { set } from 'date-fns';
import { Shoppingcart } from '../../model/shoppingcart';
import { Item } from '../../model/item';

test('given: valid values for a shopping cart, when: shopping cart is constructed, then: shopping cart is created with those values', () => {
    // given valid values for a shopping cart
    const validName = 'Groceries';
    const validDeliveryDate = set(new Date(Date.now() + 86400000), { hours: 12, minutes: 0 });

    // when shopping cart is constructed
    const shoppingcart = new Shoppingcart({
        name: validName,
        deliveryDate: validDeliveryDate,
        items: [],
    });

    // then shopping cart is created with those values
    expect(shoppingcart.getName()).toEqual(validName);
    expect(shoppingcart.getDeliveryDate()).toEqual(validDeliveryDate);
    expect(shoppingcart.getUser()).toBeUndefined();
});

test('given: invalid name for a shopping cart, when: shopping cart is constructed, then: error is thrown', () => {
    // given invalid name for a shopping cart
    const invalidName = '';
    const validDeliveryDate = set(new Date(Date.now() + 86400000), { hours: 12, minutes: 0 });

    // when shopping cart is constructed
    const shoppingcart = () =>
        new Shoppingcart({
            name: invalidName,
            deliveryDate: validDeliveryDate,
            items: [],
        });

    // then error is thrown
    expect(shoppingcart).toThrow('Name is required');
});

test('given: invalid delivery date for a shopping cart, when: shopping cart is constructed, then: error is thrown', () => {
    // given invalid delivery date for a shopping cart
    const validName = 'Groceries';
    const invalidDeliveryDate = new Date('Invalid Date');

    // when shopping cart is constructed
    const shoppingcart = () =>
        new Shoppingcart({
            name: validName,
            deliveryDate: invalidDeliveryDate,
            items: [],
        });

    // then error is thrown
    expect(shoppingcart).toThrow('Delivery date is required');
});

test('given: delivery date before today for a shopping cart, when: shopping cart is constructed, then: error is thrown', () => {
    // given delivery date before today for a shopping cart
    const validName = 'Groceries';
    const invalidDeliveryDate = set(new Date(Date.now() - 86400000), { hours: 12, minutes: 0 });

    // when shopping cart is constructed
    const shoppingcart = () =>
        new Shoppingcart({
            name: validName,
            deliveryDate: invalidDeliveryDate,
            items: [],
        });

    // then error is thrown
    expect(shoppingcart).toThrow('Delivery date should be after today');
});

test('given: valid shoppingcart and item, when: adding item to a shopping cart, then: item is added to the shopping cart', () => {
    // given valid shoppingcart
    const shoppingcart = new Shoppingcart({
        name: 'Groceries',
        deliveryDate: set(new Date(Date.now() + 86400000), { hours: 12, minutes: 0 }),
        items: [],
    });

    const item = new Item({
        name: 'Paprika',
        price: 0.49,
        pathToImage: '/public/paprika.png',
        category: 'vegetables',
    });

    // when adding item to a shopping cart
    shoppingcart.addItem(item);

    // then item is added to the shopping cart
    expect(shoppingcart.getItems()).toHaveLength(1);
    expect(shoppingcart.getItems().map((i) => i.item)).toContain(item);
});

test('given: valid shopping cart with items, when: removing item, then: that item is removed once', () => {
    // given valid shopping cart with items
    const shoppingcart = new Shoppingcart({
        name: 'Groceries',
        deliveryDate: set(new Date(Date.now() + 86400000), { hours: 12, minutes: 0 }),
        items: [],
    });

    const item = new Item({
        name: 'Paprika',
        price: 0.49,
        pathToImage: '/public/paprika.png',
        category: 'vegetables',
    });

    shoppingcart.addItem(item);
    shoppingcart.addItem(item);

    // when removing item
    shoppingcart.removeItem(item);

    // then that item is removed once
    expect(shoppingcart.getItems()).toHaveLength(1);
});

test('given: valid shopping cart with items, when: removing item that does not exist in the shoppingcart, then: error is thrown', () => {
    // given valid shopping cart with items
    const shoppingcart = new Shoppingcart({
        name: 'Groceries',
        deliveryDate: set(new Date(Date.now() + 86400000), { hours: 12, minutes: 0 }),
        items: [],
    });

    const item = new Item({
        name: 'Paprika',
        price: 0.49,
        pathToImage: '/public/paprika.png',
        category: 'vegetables',
    });

    shoppingcart.addItem(item);

    // when removing item
    shoppingcart.removeItem(item);

    // then error is thrown when trying to remove the item again
    expect(() => shoppingcart.removeItem(item)).toThrow(
        'This item does not exist in this shopping cart'
    );
});

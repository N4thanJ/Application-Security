import itemDb from '../../repository/item.db';
import nutritionlabelDb from '../../repository/nutritionlabel.db';
import itemService from '../../service/item.service';
import { ItemInput, NutritionlabelInput } from '../../types';

let mockItemDbGetAllItems: jest.Mock;
let mockItemDbCreate: jest.Mock;
let createItemMock: jest.Mock;
let mockItemDbGetById: jest.Mock;
let mockNutritionlabelDbCreate: jest.Mock;
let addNutritionlabelMock: jest.Mock;

let mockItemDbDeleteItem: jest.Mock;

beforeEach(() => {
    mockItemDbGetAllItems = jest.fn();
    mockItemDbCreate = jest.fn();
    createItemMock = jest.fn();
    mockItemDbGetById = jest.fn();
    mockNutritionlabelDbCreate = jest.fn();
    addNutritionlabelMock = jest.fn();

    mockItemDbDeleteItem = jest.fn();
});

test('given: a filled itemDb, when: getting all items from itemService, then: all items are returned', async () => {
    // given a filled userDB
    const item1: ItemInput = {
        name: 'Banana',
        price: 10,
        pathToImage: 'public/banana.png',
        category: 'fruits',
    };

    const items: ItemInput[] = [item1];

    itemDb.getAll = mockItemDbGetAllItems.mockReturnValue(items);

    // when getting all users from userService
    await itemService.getAllItems();

    // then all users are returned
    expect(mockItemDbGetAllItems).toHaveBeenCalled();
    expect(mockItemDbGetAllItems).toHaveReturnedWith(items);
});

test('given: an a valid item, when: creating a item, then: the item is created and returned', async () => {
    // given a valid item
    const item: ItemInput = {
        name: 'Tomato',
        price: 10,
        pathToImage: 'public/tomato.png',
        category: 'vegetables',
    };

    itemDb.create = createItemMock.mockReturnValue(item);

    // when adding an item to the itemDb
    await itemService.createItem(item);

    // then the item is added
    expect(createItemMock).toHaveBeenCalled();
    expect(createItemMock).toHaveBeenCalledWith(item);
});

test('given: a valid nutritionlabel, when: adding a nutritionlabel to a item, then: the nutritionlabel is added to the item and the item is returned', async () => {
    // given a valid nutritionlabel
    const item: ItemInput = {
        id: 0,
        name: 'Tomato',
        price: 10,
        pathToImage: 'public/tomato.png',
        category: 'vegetables',
    };

    const nutritionlabel: NutritionlabelInput = {
        energy: 100,
        fat: 0.3,
        saturatedFats: 0.1,
        carbohydrates: 27,
        sugar: 14,
        protein: 1.3,
        salts: 0.01,
        itemId: 0,
    };

    itemDb.getById = mockItemDbGetById.mockReturnValue(item);
    nutritionlabelDb.create = mockNutritionlabelDbCreate.mockReturnValue(nutritionlabel);

    itemDb.addNutritionlabel = addNutritionlabelMock.mockReturnValue(item);

    // when adding a nutritionlabel to a item
    if (item.id !== undefined) {
        await itemService.addNutritionLabelToItem(item.id, nutritionlabel);
    }

    // then the nutritionlabel is added to the item and the item is returned
    expect(addNutritionlabelMock).toHaveBeenCalled();
    expect(addNutritionlabelMock).toHaveBeenCalledWith(item, nutritionlabel);
});

test('given a filled itemDb and an id of an item, when: deleting a item, then: the item with that id is deleted', async () => {
    // given a filled itemDb and a id of an item
    const item: ItemInput = {
        id: 0,
        name: 'Tomato',
        price: 10,
        pathToImage: 'public/tomato.png',
        category: 'vegetables',
    };

    itemDb.getAll = mockItemDbGetAllItems.mockReturnValue([item]);

    itemDb.deleteItem = mockItemDbDeleteItem.mockReturnValue('Item Deleted');

    // when deleting a item
    if (item.id !== undefined) {
        await itemService.deleteItemById(item.id);
    }

    // then the item with that id is deleted
    expect(mockItemDbDeleteItem).toHaveBeenCalled();
    expect(mockItemDbDeleteItem).toHaveBeenCalledWith(item.id);
});

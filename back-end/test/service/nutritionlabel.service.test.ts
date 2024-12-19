import nutritionlabelDb from '../../repository/nutritionlabel.db';
import nutritionlabelService from '../../service/nutritionlabel.service';
import { ItemInput, NutritionlabelInput } from '../../types';

let mockNutritionlabelDbGetAllNutritionlabels: jest.Mock;
let mockNutritionlabelDbCreate: jest.Mock;
let mockItemDbCreate: jest.Mock;

beforeEach(() => {
    mockNutritionlabelDbGetAllNutritionlabels = jest.fn();
    mockNutritionlabelDbCreate = jest.fn();
    mockItemDbCreate = jest.fn();
});

test('given: a filled nutritionlabelDb, when: getting all nutritionlabels from nutritionlabelService, then: all nutritionlabels are returned', async () => {
    // given a filled nutritionlabelDb
    const item: ItemInput = {
        id: 0,
        name: 'Banana',
        price: 10,
        pathToImage: 'public/banana.png',
        category: 'fruits',
    };

    const nutritionlabel1: NutritionlabelInput = {
        energy: 100,
        fat: 0.3,
        saturatedFats: 0.1,
        carbohydrates: 27,
        sugar: 14,
        protein: 1.3,
        salts: 0.01,
        itemId: 0,
    };

    const nutritionlabels: NutritionlabelInput[] = [nutritionlabel1];

    nutritionlabelDb.getAll =
        mockNutritionlabelDbGetAllNutritionlabels.mockReturnValue(nutritionlabels);

    // when getting all nutritionlabels from nutritionlabelService
    await nutritionlabelService.getAllNutritionlabels();

    // then all nutritionlabels are returned
    expect(mockNutritionlabelDbGetAllNutritionlabels).toHaveBeenCalled();
    expect(mockNutritionlabelDbGetAllNutritionlabels).toHaveReturnedWith(nutritionlabels);
});

test('given: a valid nutritionlabel, when: creating a nutritionlabel with nutritionlabelService, then: the nutritionlabel is created', async () => {
    // given a valid nutritionlabel
    const item: ItemInput = {
        id: 0,
        name: 'Banana',
        price: 10,
        pathToImage: 'public/banana.png',
        category: 'fruits',
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

    nutritionlabelDb.create = mockNutritionlabelDbCreate.mockReturnValue(nutritionlabel);

    // when creating a nutritionlabel with nutritionlabelService
    await nutritionlabelService.createNutritionlabel(nutritionlabel);

    // then the nutritionlabel is created
    expect(mockNutritionlabelDbCreate).toHaveBeenCalled();
    expect(mockNutritionlabelDbCreate).toHaveReturnedWith(nutritionlabel);
});

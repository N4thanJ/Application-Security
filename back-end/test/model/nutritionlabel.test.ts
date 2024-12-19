import { Nutritionlabel } from '../../model/nutritionlabel';

test('given: valid values for a user, when: user is constructed, then: user is created with those values', () => {
    // given valid values for a user
    const validEnergy = 100;
    const validFat = 10;
    const validSaturatedFats = 5;
    const validCarbohydrates = 20;
    const validSugar = 15;
    const validProtein = 8;
    const validSalts = 2;

    // when user is constructed
    const nutritionlabel = new Nutritionlabel({
        energy: validEnergy,
        fat: validFat,
        saturatedFats: validSaturatedFats,
        carbohydrates: validCarbohydrates,
        sugar: validSugar,
        protein: validProtein,
        salts: validSalts,
    });

    // then user is created with those values
    expect(nutritionlabel.getEnergy()).toEqual(validEnergy);
    expect(nutritionlabel.getFat()).toEqual(validFat);
    expect(nutritionlabel.getSaturatedFats()).toEqual(validSaturatedFats);
    expect(nutritionlabel.getCarbohydrates()).toEqual(validCarbohydrates);
    expect(nutritionlabel.getSugar()).toEqual(validSugar);
    expect(nutritionlabel.getProtein()).toEqual(validProtein);
    expect(nutritionlabel.getSalts()).toEqual(validSalts);
});

test('given: negative energy value, when: nutritionlabel is constructed, then: error is thrown', () => {
    // given negative energy value
    const negativeEnergy = -100;

    // when nutritionlabel is constructed
    const nutritionlabel = () =>
        new Nutritionlabel({
            energy: negativeEnergy,
            fat: 10,
            saturatedFats: 5,
            carbohydrates: 20,
            sugar: 15,
            protein: 8,
            salts: 2,
        });

    // then error is thrown
    expect(nutritionlabel).toThrow('Energy must be a positive value');
});

test('given: negative fat value, when: nutritionlabel is constructed, then: error is thrown', () => {
    // given negative fat value
    const negativeFat = -10;

    // when nutritionlabel is constructed
    const nutritionlabel = () =>
        new Nutritionlabel({
            energy: 100,
            fat: negativeFat,
            saturatedFats: 5,
            carbohydrates: 20,
            sugar: 15,
            protein: 8,
            salts: 2,
        });

    // then error is thrown
    expect(nutritionlabel).toThrow('Fat must be a positive value');
});

test('given: negative saturated fats value, when: nutritionlabel is constructed, then: error is thrown', () => {
    // given negative saturated fats value
    const negativeSaturatedFats = -5;

    // when nutritionlabel is constructed
    const nutritionlabel = () =>
        new Nutritionlabel({
            energy: 100,
            fat: 10,
            saturatedFats: negativeSaturatedFats,
            carbohydrates: 20,
            sugar: 15,
            protein: 8,
            salts: 2,
        });

    // then error is thrown
    expect(nutritionlabel).toThrow('Saturated fats must be a positive value');
});

test('given: negative carbohydrates value, when: nutritionlabel is constructed, then: error is thrown', () => {
    // given negative carbohydrates value
    const negativeCarbohydrates = -20;

    // when nutritionlabel is constructed
    const nutritionlabel = () =>
        new Nutritionlabel({
            energy: 100,
            fat: 10,
            saturatedFats: 5,
            carbohydrates: negativeCarbohydrates,
            sugar: 15,
            protein: 8,
            salts: 2,
        });

    // then error is thrown
    expect(nutritionlabel).toThrow('Carbohydrates must be a positive value');
});

test('given: negative sugar value, when: nutritionlabel is constructed, then: error is thrown', () => {
    // given negative sugar value
    const negativeSugar = -15;

    // when nutritionlabel is constructed
    const nutritionlabel = () =>
        new Nutritionlabel({
            energy: 100,
            fat: 10,
            saturatedFats: 5,
            carbohydrates: 20,
            sugar: negativeSugar,
            protein: 8,
            salts: 2,
        });

    // then error is thrown
    expect(nutritionlabel).toThrow('Sugar must be a positive value');
});

test('given: negative protein value, when: nutritionlabel is constructed, then: error is thrown', () => {
    // given negative protein value
    const negativeProtein = -8;

    // when nutritionlabel is constructed
    const nutritionlabel = () =>
        new Nutritionlabel({
            energy: 100,
            fat: 10,
            saturatedFats: 5,
            carbohydrates: 20,
            sugar: 15,
            protein: negativeProtein,
            salts: 2,
        });

    // then error is thrown
    expect(nutritionlabel).toThrow('Protein must be a positive value');
});

test('given: negative salts value, when: nutritionlabel is constructed, then: error is thrown', () => {
    // given negative salts value
    const negativeSalts = -2;

    // when nutritionlabel is constructed
    const nutritionlabel = () =>
        new Nutritionlabel({
            energy: 100,
            fat: 10,
            saturatedFats: 5,
            carbohydrates: 20,
            sugar: 15,
            protein: 8,
            salts: negativeSalts,
        });

    // then error is thrown
    expect(nutritionlabel).toThrow('Salts must be a positive value');
});

test('given: invalid energy value, when: nutritionlabel is constructed, then: error is thrown', () => {
    // given invalid energy value
    const invalidEnergy = NaN;

    // when nutritionlabel is constructed
    const nutritionlabel = () =>
        new Nutritionlabel({
            energy: invalidEnergy,
            fat: 10,
            saturatedFats: 5,
            carbohydrates: 20,
            sugar: 15,
            protein: 8,
            salts: 2,
        });

    // then error is thrown
    expect(nutritionlabel).toThrow('Energy is required');
});

test('given: invalid fat value, when: nutritionlabel is constructed, then: error is thrown', () => {
    // given invalid fat value
    const invalidFat = NaN;

    // when nutritionlabel is constructed
    const nutritionlabel = () =>
        new Nutritionlabel({
            energy: 100,
            fat: invalidFat,
            saturatedFats: 5,
            carbohydrates: 20,
            sugar: 15,
            protein: 8,
            salts: 2,
        });

    // then error is thrown
    expect(nutritionlabel).toThrow('Fat is required');
});

test('given: invalid saturated fats value, when: nutritionlabel is constructed, then: error is thrown', () => {
    // given invalid saturated fats value
    const invalidSaturatedFats = NaN;

    // when nutritionlabel is constructed
    const nutritionlabel = () =>
        new Nutritionlabel({
            energy: 100,
            fat: 10,
            saturatedFats: invalidSaturatedFats,
            carbohydrates: 20,
            sugar: 15,
            protein: 8,
            salts: 2,
        });

    // then error is thrown
    expect(nutritionlabel).toThrow('Saturated fats are required');
});

test('given: invalid carbohydrates value, when: nutritionlabel is constructed, then: error is thrown', () => {
    // given invalid carbohydrates value
    const invalidCarbohydrates = NaN;

    // when nutritionlabel is constructed
    const nutritionlabel = () =>
        new Nutritionlabel({
            energy: 100,
            fat: 10,
            saturatedFats: 5,
            carbohydrates: invalidCarbohydrates,
            sugar: 15,
            protein: 8,
            salts: 2,
        });

    // then error is thrown
    expect(nutritionlabel).toThrow('Carbohydrates are required');
});

test('given: invalid sugar value, when: nutritionlabel is constructed, then: error is thrown', () => {
    // given invalid sugar value
    const invalidSugar = NaN;

    // when nutritionlabel is constructed
    const nutritionlabel = () =>
        new Nutritionlabel({
            energy: 100,
            fat: 10,
            saturatedFats: 5,
            carbohydrates: 20,
            sugar: invalidSugar,
            protein: 8,
            salts: 2,
        });

    // then error is thrown
    expect(nutritionlabel).toThrow('Sugar is required');
});

test('given: invalid protein value, when: nutritionlabel is constructed, then: error is thrown', () => {
    // given invalid protein value
    const invalidProtein = NaN;

    // when nutritionlabel is constructed
    const nutritionlabel = () =>
        new Nutritionlabel({
            energy: 100,
            fat: 10,
            saturatedFats: 5,
            carbohydrates: 20,
            sugar: 15,
            protein: invalidProtein,
            salts: 2,
        });

    // then error is thrown
    expect(nutritionlabel).toThrow('Protein is required');
});

test('given: invalid salts value, when: nutritionlabel is constructed, then: error is thrown', () => {
    // given invalid salts value
    const invalidSalts = NaN;

    // when nutritionlabel is constructed
    const nutritionlabel = () =>
        new Nutritionlabel({
            energy: 100,
            fat: 10,
            saturatedFats: 5,
            carbohydrates: 20,
            sugar: 15,
            protein: 8,
            salts: invalidSalts,
        });

    // then error is thrown
    expect(nutritionlabel).toThrow('Salts are required');
});

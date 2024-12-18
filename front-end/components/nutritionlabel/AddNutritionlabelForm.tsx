import { useState } from 'react';
import ItemService from '@services/ItemsService';
import { Item, Nutritionlabel } from '@types';
import { useRouter } from 'next/router';

type Props = {
    item: Item;
};

const AddNutritionLabelForm: React.FC<Props> = ({ item }: Props) => {
    const router = useRouter();
    const [nutritionlabel, setNutritionlabel] = useState<Nutritionlabel>({
        id: item.nutritionlabel?.id,
        energy: item.nutritionlabel?.energy || 0,
        fat: item.nutritionlabel?.fat || 0,
        saturatedFats: item.nutritionlabel?.saturatedFats || 0,
        carbohydrates: item.nutritionlabel?.carbohydrates || 0,
        sugar: item.nutritionlabel?.sugar || 0,
        protein: item.nutritionlabel?.protein || 0,
        salts: item.nutritionlabel?.salts || 0,
        item: item || undefined,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNutritionlabel((prev) => ({
            ...prev,
            [name]: value === '' ? '' : Number(value),
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (item.id === undefined || item.id === null) {
                throw new Error('Item id is missing in form');
            }

            const token = JSON.parse(sessionStorage.getItem('loggedInUser') as string).token;
            const response = await ItemService.addNutritionlabelToItem(
                token,
                item.id,
                nutritionlabel
            );
            console.log('Service response:', response);

            router.push('/itemOverview');
        } catch (error) {
            console.error('Error details:', {
                error,
                itemState: item,
                nutritionLabelState: nutritionlabel,
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col p-6 w-full max-w-lg mx-auto mb-8 bg-tertiary shadow-md rounded-lg border-2 border-gray-200"
        >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                Add A Nutrition Label
            </h2>
            <div className="space-y-2">
                <div>
                    <label htmlFor="energy" className="block text-gray-700 font-medium mb-1">
                        Energy:
                    </label>
                    <input
                        type="number"
                        required
                        name="energy"
                        min="0.01"
                        step={1}
                        value={nutritionlabel.energy}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex gap-8 flex-wrap">
                    <div className="flex-1 min-w-0">
                        <label htmlFor="fat" className="block text-gray-700 font-medium mb-1">
                            Fat:
                        </label>
                        <input
                            type="number"
                            required
                            name="fat"
                            min="0.01"
                            step={1}
                            value={nutritionlabel.fat}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex-1 min-w-0">
                        <label
                            htmlFor="saturatedFats"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            Saturated Fats:
                        </label>
                        <input
                            type="number"
                            required
                            name="saturatedFats"
                            min="0.01"
                            step={1}
                            value={nutritionlabel.saturatedFats}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                <div className="flex gap-8 flex-wrap">
                    <div className="flex-1 min-w-0">
                        <label
                            htmlFor="carbohydrates"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            Carbohydrates:
                        </label>
                        <input
                            type="number"
                            required
                            name="carbohydrates"
                            min="0.01"
                            step={1}
                            value={nutritionlabel.carbohydrates}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <label htmlFor="sugar" className="block text-gray-700 font-medium mb-1">
                            Sugar:
                        </label>
                        <input
                            type="number"
                            required
                            name="sugar"
                            min="0.01"
                            step={1}
                            value={nutritionlabel.sugar}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="protein" className="block text-gray-700 font-medium mb-1">
                        Protein:
                    </label>
                    <input
                        type="number"
                        required
                        name="protein"
                        min="0.01"
                        step={1}
                        value={nutritionlabel.protein}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label htmlFor="salts" className="block text-gray-700 font-medium mb-1">
                        Salts:
                    </label>
                    <input
                        type="number"
                        required
                        name="salts"
                        min="0.01"
                        step={1}
                        value={nutritionlabel.salts}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        value="Submit"
                        className="mt-6 w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
                    >
                        {' '}
                        Submit{' '}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddNutritionLabelForm;

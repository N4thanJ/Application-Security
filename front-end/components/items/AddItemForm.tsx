import { useState, ChangeEvent } from 'react';
import ItemService from '@services/ItemsService';
import { Item, Nutritionlabel } from '@types';
import { useRouter } from 'next/router';

const AddItemForm: React.FC = () => {
    const router = useRouter();
    const [item, setItem] = useState<Item>({
        name: '',
        price: 0,
        category: 'fruits',
        pathToImage: '',
        nutritionlabel: undefined,
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setItem((prev) => ({
            ...prev,
            [name]: name === 'price' ? (value === '' ? '' : Number(value)) : value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const token = JSON.parse(sessionStorage.getItem('loggedInUser') as string).token;
            await ItemService.addItem(token, item);
        } catch (error) {
            console.error('Error adding nutrition label:', error);
        }

        router.push('/itemOverview');
    };

    return (
        <section>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col p-6 w-full max-w-lg mx-auto mb-8 bg-tertiary shadow-md rounded-lg border-2 border-gray-200"
            >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                    Add An Item
                </h2>
                <div className="space-y-2">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                            Name:
                        </label>
                        <input
                            type="text"
                            required
                            name="name"
                            value={item.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-gray-700 font-medium mb-1">
                            Price:
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            required
                            name="price"
                            value={item.price}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="pathToImage"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            Image URL:
                        </label>
                        <input
                            type="text"
                            required
                            name="pathToImage"
                            value={item.pathToImage}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-gray-700 font-medium mb-1">
                            Category:
                        </label>
                        <select
                            name="category"
                            value={item.category}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                        >
                            <option className="text-sm" value="fruits">
                                Fruits
                            </option>
                            <option className="text-sm" value="vegetables">
                                Vegetables
                            </option>
                            <option className="text-sm" value="dairy">
                                Dairy
                            </option>
                        </select>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="mt-6 w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
                        >
                            Add Item
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default AddItemForm;

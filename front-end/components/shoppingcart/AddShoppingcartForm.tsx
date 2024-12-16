import ShoppingcartService from '@services/ShopingcartService';
import { Shoppingcart } from '@types';
import { useRouter } from 'next/router';
import { useState, useRef } from 'react';

const AddShoppingcartForm: React.FC = () => {
    const router = useRouter();
    const dateInputRef = useRef<HTMLInputElement>(null);

    const [shoppingcart, setShoppingcart] = useState<Shoppingcart>({
        name: '',
        deliveryDate: new Date(),
        items: [],
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShoppingcart((prev) => ({
            ...prev,
            [name]: name === 'deliveryDate' ? new Date(value) : value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await ShoppingcartService.addShoppingcart(shoppingcart);
            router.push('/');
        } catch (error) {
            console.error('Error adding shoppingcart:', error);
        }
    };

    return (
        <>
            <h1>Create a shoppingcart</h1>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            required
                            name="name"
                            value={shoppingcart.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter a name for the shoppingcart..."
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="deliveryDate"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Delivery Date:
                        </label>
                        <div className="mt-1 relative">
                            <input
                                type="date"
                                id="deliveryDate"
                                ref={dateInputRef}
                                required
                                name="deliveryDate"
                                value={
                                    new Date(new Date().setDate(new Date().getDate() + 1))
                                        .toISOString()
                                        .split('T')[0] ||
                                    shoppingcart.deliveryDate.toISOString().split('T')[0]
                                }
                                onChange={handleInputChange}
                                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                                min={
                                    new Date(new Date().setDate(new Date().getDate() + 1))
                                        .toISOString()
                                        .split('T')[0]
                                }
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Create
                </button>
            </form>
        </>
    );
};

export default AddShoppingcartForm;
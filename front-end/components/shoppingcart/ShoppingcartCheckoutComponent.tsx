import { Item } from '@types';
import { ShoppingBagIcon } from 'lucide-react';
import Link from 'next/link';
import { calculateTotal, calculateTotalOfItem } from 'util/item';

type ShoppingcartItem = {
    item: Item;
    quantity: number;
};

type Props = {
    shoppingcart: {
        id: string;
        name: string;
        items: ShoppingcartItem[];
    };
};

const ShoppingcartCheckoutComponent: React.FC<Props> = ({ shoppingcart }: Props) => {
    return (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 md:p-8">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">{shoppingcart.name}</h1>
                    <Link href={`/shoppingcart/${shoppingcart.id}/addItems`}>
                        <span className="p-1 bg-green-400 rounded-lg text-white hover:bg-green-600 transition-all">
                            Add items
                        </span>
                    </Link>
                </div>

                <ShoppingBagIcon className="w-8 h-8 text-gray-600" />
            </div>

            {shoppingcart.items.length > 0 ? (
                <ul className="my-6 space-y-6">
                    {shoppingcart.items.map(({ item, quantity }: ShoppingcartItem) => (
                        <li
                            key={item.id}
                            className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-6"
                        >
                            <div className="flex items-center gap-4 mb-4 md:mb-0">
                                <img
                                    src={item.pathToImage}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">{item.name}</p>
                                    <p className="text-sm text-gray-500">
                                        Category: {item.category}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                                <div className="text-center">
                                    <p className="text-sm font-medium text-gray-600">Price</p>
                                    <p className="text-gray-800">${item.price.toFixed(2)}</p>
                                </div>

                                <div className="text-center">
                                    <p className="text-sm font-medium text-gray-600">Quantity</p>
                                    <input
                                        type="number"
                                        value={quantity}
                                        className="w-16 text-center border border-gray-300 rounded-md p-1 text-gray-800"
                                        min="1"
                                    />
                                </div>

                                <div className="text-center">
                                    <p className="text-sm font-medium text-gray-600">Total</p>
                                    <p className="text-gray-800">
                                        ${calculateTotalOfItem(item, quantity).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="my-6 text-center text-gray-500">No items found</p>
            )}

            <div>
                <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-gray-700">Total Items:</p>
                    <p className="text-gray-800">
                        {shoppingcart.items.reduce((acc, item) => acc + item.quantity, 0)}
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-700">Total Price:</p>
                    <p className="text-xl font-bold text-gray-800">
                        ${calculateTotal(shoppingcart.items)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ShoppingcartCheckoutComponent;

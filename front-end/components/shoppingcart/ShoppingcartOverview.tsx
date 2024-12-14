import { Item, Shoppingcart } from '@types';
import { Plus, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { calculateTotal } from 'util/item';
import { formatDate } from 'util/shoppingcart';

type Props = {
    shoppingcarts: Shoppingcart[] | [];
};

const ShoppingcartOverview: React.FC<Props> = ({ shoppingcarts }: Props) => {
    return (
        <>
            <div className="flex items-center gap-4 mb-4">
                <h2>Shoppingcart Overview</h2>
                <Link
                    href={`/addShoppingcart`}
                    className="p-1 bg-green-400 rounded-lg text-white hover:bg-green-600 transition-all"
                >
                    <Plus size={24} />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {shoppingcarts.map((shoppingcart) => (
                    <div
                        key={shoppingcart.id}
                        className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {shoppingcart.name}
                                </h3>
                                <ShoppingCart className="w-6 h-6 text-primary" />
                            </div>
                            <div className="text-sm text-gray-600">
                                <p>Due: {formatDate(shoppingcart.deliveryDate)}</p>
                                <p>
                                    Items:{' '}
                                    {shoppingcart.items.reduce(
                                        (acc, item) => acc + item.quantity,
                                        0
                                    )}
                                </p>
                                <p>Total: ${calculateTotal(shoppingcart.items as any)}</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-6 py-4 flex gap-4">
                            <Link
                                href={`/shoppingcart/${shoppingcart.id}`}
                                className="w-full bg-primary text-white text-center font-semibold py-2 px-4 rounded hover:bg-primary/70 transition-colors duration-300"
                            >
                                View Cart
                            </Link>
                            <Link
                                href={`/shoppingcart/${shoppingcart.id}/addItems`}
                                className="w-full bg-green-500 text-center text-white font-semibold py-2 px-4 rounded hover:bg-green-500/70 transition-colors duration-300"
                            >
                                Add Items
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ShoppingcartOverview;

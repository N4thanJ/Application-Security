import { Item, Shoppingcart } from '@types';
import { Plus, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

type Props = {
    shoppingcarts: Shoppingcart[] | [];
};

const calculateTotal = (items: { item: Item; quantity: number }[]): number => {
    return items.reduce((total, { item, quantity }) => {
        return total + item.price * quantity;
    }, 0);
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
                                <p>Items: {shoppingcart.items.length}</p>
                                <p>Total: ${calculateTotal(shoppingcart.items as any)}</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-6 py-4">
                            <Link href={`/shoppingcart/${shoppingcart.id}`} className="w-full bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-primary/90 transition-colors duration-300">
                                View Cart
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ShoppingcartOverview;

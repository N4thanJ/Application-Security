import { Item, Shoppingcart } from '@types';
import { PanelsTopLeft, Plus, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { calculateTotal } from 'util/item';
import { formatDate } from 'util/shoppingcart';
import { useTranslation } from 'next-i18next'; // Assuming you're using next-i18next for translations
import React from 'react';

type Props = {
    shoppingcarts: Shoppingcart[] | [];
    deleteShoppingcartById: (id: number) => void;
};

const ShoppingcartOverview: React.FC<Props> = ({
    shoppingcarts,
    deleteShoppingcartById,
}: Props) => {
    const { t } = useTranslation(); // Initialize translation function

    return (
        <>
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-4">
                <div className="flex items-center gap-4">
                    <h2>{t('ShoppingcartOverview.title')}</h2>
                    <Link
                        href={`/shoppingcarts/addShoppingcart`}
                        className="p-1 bg-green-400 flex gap-2 items-center rounded-lg text-white hover:bg-green-600 transition-all"
                    >
                        <Plus size={24} />
                        {t('ShoppingcartOverview.createShoppingcart')}
                    </Link>
                </div>

                <PanelsTopLeft className="w-8 h-8 text-gray-600" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
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
                                <p>
                                    {t('ShoppingcartOverview.due')}{' '}
                                    {formatDate(shoppingcart.deliveryDate)}
                                </p>
                                <p>
                                    {t('ShoppingcartOverview.items')}{' '}
                                    {shoppingcart.items.reduce(
                                        (acc, item) => acc + item.quantity,
                                        0
                                    )}
                                </p>
                                <p>
                                    {t('ShoppingcartOverview.total')}$
                                    {calculateTotal(shoppingcart.items as any)}
                                </p>
                            </div>
                        </div>
                        <div className="bg-gray-50 grid gap-4 p-4">
                            <div className="flex justify-between">
                                <Link
                                    href={`/shoppingcart/${shoppingcart.id}`}
                                    className="bg-primary text-white text-center font-semibold py-3 px-4 rounded hover:bg-primary/70 transition-colors duration-300"
                                >
                                    {t('ShoppingcartOverview.viewCart')}
                                </Link>
                                <Link
                                    href={`/shoppingcart/${shoppingcart.id}/addItems`}
                                    className="bg-green-500 text-center text-white font-semibold py-3 px-4 rounded hover:bg-green-500/70 transition-colors duration-300"
                                >
                                    {t('ShoppingcartOverview.addItems')}
                                </Link>
                            </div>

                            <button
                                onClick={() => deleteShoppingcartById(Number(shoppingcart.id))}
                                className="bg-red-500 text-center text-white font-semibold py-3 px-4 rounded hover:bg-red-500/70 transition-colors duration-300"
                            >
                                {t('ShoppingcartOverview.delete')}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ShoppingcartOverview;

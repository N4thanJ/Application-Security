import { Item, Shoppingcart } from '@types';
import { Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { calculateTotal, calculateTotalOfItem } from 'util/item';
import { useTranslation } from 'next-i18next'; // Assuming you're using next-i18next for translations
import React from 'react';

type ShoppingcartItem = {
    item: Item;
    quantity: number;
};

type Props = {
    shoppingcart: Shoppingcart;
    onDeleteItemFromShoppingcart: (itemId: number, shoppingcartId: number) => void;
    handleQuantityChange: (item: Item, shoppingcart: Shoppingcart, quantity: number) => void;
};

const ShoppingcartCheckoutComponent: React.FC<Props> = ({
    shoppingcart,
    onDeleteItemFromShoppingcart,
    handleQuantityChange,
}: Props) => {
    const { t } = useTranslation(); // Initialize translation function
    const [itemQuantities, setItemQuantities] = useState<{ [key: number]: number }>({});

    useEffect(() => {
        const initialQuantities: { [key: number]: number } = {};
        shoppingcart.items.forEach(({ item, quantity }) => {
            if (item.id !== undefined) {
                initialQuantities[item.id] = quantity;
            }
        });
        setItemQuantities(initialQuantities);
    }, [shoppingcart]);

    const handleQuantityChangeLocal = (item: Item, quantity: number) => {
        setItemQuantities((prev) => ({ ...prev, [item.id as number]: quantity }));
        handleQuantityChange(item, shoppingcart, quantity);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 md:p-8">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">{shoppingcart.name}</h1>
                    <Link
                        href={`/shoppingcart/${shoppingcart.id}/addItems`}
                        className="p-1 flex items-center bg-green-400 rounded-lg text-white hover:bg-green-600 transition-all"
                    >
                        <Plus />
                        {t('ShoppingcartCheckoutComponent.addItems')}
                    </Link>
                </div>
                <ShoppingBag className="w-8 h-8 text-gray-600" />
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
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
                                <div className="text-center">
                                    <p className="text-sm font-medium text-gray-600">
                                        {t('ShoppingcartCheckoutComponent.price')}
                                    </p>
                                    <p className="text-gray-800">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-medium text-gray-600">
                                        {t('ShoppingcartCheckoutComponent.quantity')}
                                    </p>
                                    <input
                                        type="number"
                                        value={itemQuantities[Number(item.id)] || quantity}
                                        onChange={(e) =>
                                            handleQuantityChangeLocal(item, Number(e.target.value))
                                        }
                                        className="w-16 text-center border border-gray-300 rounded-md p-1 text-gray-800"
                                        min="0"
                                    />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-medium text-gray-600">
                                        {t('ShoppingcartCheckoutComponent.total')}
                                    </p>
                                    <p className="text-gray-800">
                                        $$
                                        {calculateTotalOfItem(
                                            item,
                                            itemQuantities[Number(item.id)] || quantity
                                        ).toFixed(2)}
                                    </p>
                                </div>
                                <Link
                                    className="bg-red-500 p-2 rounded-lg text-white border-2 border-gray-600"
                                    href="#"
                                    onClick={() => {
                                        if (
                                            item.id !== undefined &&
                                            shoppingcart.id !== undefined
                                        ) {
                                            onDeleteItemFromShoppingcart(item.id, shoppingcart.id);
                                        }
                                    }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="my-6 text-center text-gray-500">
                    {t('ShoppingcartCheckoutComponent.noItems')}
                </p>
            )}

            <div>
                <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-gray-700">
                        {t('ShoppingcartCheckoutComponent.totalItems')}
                    </p>
                    <p className="text-gray-800">
                        {shoppingcart.items.reduce((acc, item) => acc + item.quantity, 0)}
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-700">
                        {t('ShoppingcartCheckoutComponent.totalPrice')}
                    </p>
                    <p className="text-xl font-bold text-gray-800">
                        ${calculateTotal(shoppingcart.items)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ShoppingcartCheckoutComponent;

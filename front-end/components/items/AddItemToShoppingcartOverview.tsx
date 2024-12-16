import React, { useState, useMemo } from 'react';
import { Item, Shoppingcart, Category } from '@types';
import { ChevronDown, Minus, Plus } from 'lucide-react';

type Props = {
    items: Item[];
    shoppingcart: Shoppingcart;
    selectedItem: (item: Item) => void;
    removeAnItemFromShoppingcart: (item: Item, shoppingcart: Shoppingcart) => void;
    addItemToShoppingcart: (item: Item, shoppingcart: Shoppingcart) => void;
    handleQuantityChange: (item: Item, shoppingcart: Shoppingcart, quantity: number) => void;
};

const AddItemToShoppingcartOverview: React.FC<Props> = ({
    items,
    shoppingcart,
    selectedItem,
    removeAnItemFromShoppingcart,
    addItemToShoppingcart,
    handleQuantityChange,
}: Props) => {
    const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');
    const [nameFilter, setNameFilter] = useState('');

    const categories = useMemo(() => {
        const uniqueCategories = new Set(items.map((item) => item.category));
        return ['all', ...Array.from(uniqueCategories)] as (Category | 'all')[];
    }, [items]);

    const filteredItems = useMemo(() => {
        return items.filter(
            (item) =>
                (categoryFilter === 'all' || item.category === categoryFilter) &&
                item.name.toLowerCase().includes(nameFilter.toLowerCase())
        );
    }, [items, categoryFilter, nameFilter]);

    return (
        <div className="py-4">
            <div className="mb-4 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <label
                        htmlFor="category-filter"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Filter by Category
                    </label>
                    <select
                        id="category-filter"
                        className="w-full p-2 border border-gray-300 rounded-md cursor-pointer"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value as Category | 'all')}
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category === 'all' ? 'All Categories' : category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex-1">
                    <label
                        htmlFor="name-filter"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Filter by Name
                    </label>
                    <input
                        type="text"
                        id="name-filter"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        placeholder="Search by name..."
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => selectedItem(item)}
                        className="overflow-hidden cursor-pointer flex flex-col shadow-lg hover:shadow-2xl duration-300 transition-all rounded-md bg-tertiary"
                    >
                        <div className="h-48 w-full relative bg-gray-100">
                            <img
                                src={item.pathToImage}
                                className="w-full h-full object-cover"
                                alt={`${item.name} image`}
                            />
                        </div>
                        <div className="p-3">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                                <p className="text-sm text-white bg-red-500 inline-block rounded-md py-1 px-1">
                                    {item.price} €
                                </p>
                            </div>

                            <div className="flex items-center justify-center space-x-2 mt-4">
                                {(shoppingcart.items.find(
                                    (cartItem) => cartItem.item.id === item.id
                                )?.quantity ?? 0) > 0 && (
                                    <>
                                        <button
                                            className="bg-blue-500 rounded-full hover:bg-blue-700 transition-all text-white p-1"
                                            onClick={() =>
                                                removeAnItemFromShoppingcart(item, shoppingcart)
                                            }
                                        >
                                            <Minus size={24} />
                                        </button>
                                        <input
                                            type="text"
                                            className="w-28 text-center border border-gray-300 rounded-md"
                                            defaultValue={
                                                shoppingcart.items.find(
                                                    (cartItem) => cartItem.item.id === item.id
                                                )?.quantity || 0
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleQuantityChange(
                                                        item,
                                                        shoppingcart,
                                                        parseInt(
                                                            (e.target as HTMLInputElement).value
                                                        ) || 0
                                                    );
                                                    (e.target as HTMLInputElement).blur();
                                                }
                                            }}
                                            onBlur={(e) => {
                                                handleQuantityChange(
                                                    item,
                                                    shoppingcart,
                                                    parseInt(e.target.value) || 0
                                                );
                                            }}
                                        />
                                    </>
                                )}
                                <button
                                    className="bg-blue-500 rounded-full hover:bg-blue-700 transition-all text-white p-1"
                                    onClick={() => addItemToShoppingcart(item, shoppingcart)}
                                >
                                    <Plus size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddItemToShoppingcartOverview;

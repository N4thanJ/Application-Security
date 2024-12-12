import { Item } from '@types';
import React from 'react';
import { Plus, ChevronDown } from 'lucide-react';

type Props = {
    items: Item[] | [];
    selectedItem: (item: Item) => void;
};

const ItemsOverview: React.FC<Props> = ({ items, selectedItem }: Props) => {
    return (
        <>
            {items && (
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="border border-gray-200 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col"
                        >
                            <div className="h-48 w-full relative bg-gray-100">
                                <img
                                    src={item.pathToImage}
                                    className="w-full h-full object-cover"
                                    alt={`${item.name} image`}
                                />
                            </div>

                            <div className="grid p-4">
                                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                                <p className="text-sm text-gray-500">{item.price} €</p>
                            </div>

                            <button
                                onClick={() => selectedItem(item)}
                                className="py-2 text-gray-600 hover:bg-gray-100 flex justify-center items-center transition duration-200"
                                aria-label={`Expand details for ${item.name}`}
                            >
                                <ChevronDown />
                            </button>
                        </div>
                    ))}
                </section>
            )}
        </>
    );
};

export default ItemsOverview;

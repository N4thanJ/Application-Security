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
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => selectedItem(item)}
                            className="overflow-hidden transform transition-transform duration-300 cursor-pointer flex flex-col shadow-lg rounded-md bg-tertiary"
                        >
                            <div className="h-48 w-full relative">
                                <img
                                    src={item.pathToImage}
                                    className="w-full h-full object-cover"
                                    alt={`${item.name} image`}
                                />
                            </div>

                            <div className="grid p-4">
                                <h2 className="text-lg font-semibold text-gray-700">{item.name}</h2>
                                <p className="text-sm text-gray-400">{item.price} €</p>
                            </div>
                        </div>
                    ))}
                </section>
            )}
        </>
    );
};

export default ItemsOverview;

import ItemOverview from '@components/items/ItemOverview';
import NutritionLabel from '@components/items/NutritionLabel';
import ItemsService from '@services/ItemsService';
import { Item } from '@types';
import { X } from 'lucide-react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const ItemPage: React.FC = () => {
    const [items, setItems] = useState<Item[] | []>([]);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    useEffect(() => {
        getItems();
    }, []);

    const getItems = async () => {
        const response = await ItemsService.getAllItems();
        const items = await response.json();
        setItems(items);
    };

    return (
        <>
            <Head>
                <title>Item Overview Page</title>
            </Head>
            <section>
                <h1 className="text-center py-4 text-2xl font-semibold">Item Overview Page</h1>
                <div>
                    {items && <ItemOverview items={items} selectedItem={setSelectedItem} />}

                    {selectedItem && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                            onClick={() => setSelectedItem(null)}
                        >
                            <div
                                className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 relative"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <X
                                    className="absolute top-3 right-3 text-gray-500 hover:text-red-700 transition-all cursor-pointer"
                                    onClick={() => setSelectedItem(null)}
                                    size={32}
                                />
                                <NutritionLabel item={selectedItem} />
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default ItemPage;

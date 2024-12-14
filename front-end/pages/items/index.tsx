import ItemOverview from '@components/items/ItemOverview';
import ItemsService from '@services/ItemsService';
import { Item } from '@types';
import { Images } from 'lucide-react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const ItemPage: React.FC = () => {
    const [items, setItems] = useState<Item[] | []>([]);
    const [fruits, setFruits] = useState<Item[] | []>([]);
    const [vegetables, setVegetables] = useState<Item[] | []>([]);
    const [dairy, setDairy] = useState<Item[] | []>([]);
    const [meat, setMeat] = useState<Item[] | []>([]);
    const [fish, setFish] = useState<Item[] | []>([]);

    const getItems = async () => {
        const response = await ItemsService.getAllItems();
        const items = await response.json();
        setItems(items);
    };

    useEffect(() => {
        getItems();

        const fruits = items.filter((item: Item) => String(item.category) === 'fruits');
        setFruits(fruits);

        const vegetables = items.filter((item: Item) => String(item.category) === 'vegetables');
        setVegetables(vegetables);

        const dairy = items.filter((item: Item) => String(item.category) === 'dairy');
        setDairy(dairy);

        const meat = items.filter((item: Item) => String(item.category) === 'meat');
        setMeat(meat);

        const fish = items.filter((item: Item) => String(item.category) === 'fish');
        setFish(fish);
    }, [items]);

    return (
        <>
            <Head>
                <title>Item Overview Page</title>
            </Head>

            <section className="border rounded-lg shadow-lg p-8">
                <div className="flex justify-between">
                    <h1 className="text-2xl pb-2">Item Overview</h1>
                    <Images className="w-8 h-8 text-gray-600" />
                </div>

                <div className="border-t-2 py-4">
                    <h2 className="text-xl font-semibold">Fruits</h2>
                    <div>{items && <ItemOverview items={fruits} />}</div>
                </div>

                <div className="border-t-2 py-4">
                    <h2 className="text-xl font-semibold">Vegetables</h2>
                    <div>{items && <ItemOverview items={vegetables} />}</div>
                </div>

                <div className="border-t-2 py-4">
                    <h2 className="text-xl font-semibold">dairy</h2>
                    <div>{items && <ItemOverview items={dairy} />}</div>
                </div>

                <div className="border-t-2 py-4">
                    <h2 className="text-xl font-semibold">meat</h2>
                    <div>{items && <ItemOverview items={meat} />}</div>
                </div>

                <div className="border-t-2 py-4">
                    <h2 className="text-xl font-semibold">fish</h2>
                    <div>{items && <ItemOverview items={fish} />}</div>
                </div>
            </section>
        </>
    );
};

export default ItemPage;

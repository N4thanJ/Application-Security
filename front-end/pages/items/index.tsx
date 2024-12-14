import ItemOverview from '@components/items/ItemOverview';
import ItemsService from '@services/ItemsService';
import { Item } from '@types';
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
            <div className="my-8">
                <h1 className="text-2xl font-semibold">Fruits</h1>
                <div>{items && <ItemOverview items={fruits} />}</div>
            </div>

            <div className="mb-8">
                <h1 className="text-2xl font-semibold">Vegetables</h1>
                <div>{items && <ItemOverview items={vegetables} />}</div>
            </div>

            <div>
                <h1 className="text-2xl font-semibold">dairy</h1>
                <div>{items && <ItemOverview items={dairy} />}</div>
            </div>

            <div>
                <h1 className="text-2xl font-semibold">meat</h1>
                <div>{items && <ItemOverview items={meat} />}</div>
            </div>

            <div>
                <h1 className="text-2xl font-semibold">fish</h1>
                <div>{items && <ItemOverview items={fish} />}</div>
            </div>
        </>
    );
};

export default ItemPage;

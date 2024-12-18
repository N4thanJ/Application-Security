import ItemOverview from '@components/items/ItemOverview';
import UserTable from '@components/users/UserTable';
import ItemsService from '@services/ItemsService';
import { Item, User } from '@types';
import { Images } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ItemPage: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [items, setItems] = useState<Item[] | []>([]);
    const [fruits, setFruits] = useState<Item[] | []>([]);
    const [vegetables, setVegetables] = useState<Item[] | []>([]);
    const [dairy, setDairy] = useState<Item[] | []>([]);
    const [meat, setMeat] = useState<Item[] | []>([]);
    const [fish, setFish] = useState<Item[] | []>([]);

    useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem('loggedInUser') || 'null');
        setLoggedInUser(token);
    }, []);

    useEffect(() => {
        const getItems = async () => {
            const response = await ItemsService.getAllItems();
            const items = await response.json();
            setItems(items);

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
        };

        getItems();
    }, []);

    return (
        <>
            <Head>
                <title>Item Overview Page</title>
            </Head>

            <section className="border rounded-lg shadow-lg p-8 mb-8">
                <h1>Welcome to Shop & Go</h1>
                <p>
                    Here you can shop and go! Our store is dedicated to bringing you convenience and
                    simplicity, whether you're looking for daily essentials or a special treat. With
                    a curated selection of top-quality products, we aim to make your shopping
                    experience quick, easy, and enjoyable.
                </p>
                <p>
                    At Shop & Go, we believe in saving you time without compromising on quality. We
                    pride ourselves on excellent service, unbeatable value, and a hassle-free
                    experience every time you visit. Come explore a new way to shop!
                </p>

                <a
                    href="#offers"
                    className="bg-blue-600 text-white p-2 mt-4 inline-block rounded-lg shadow-lg hover:bg-blue-700/80 transition-all duration-300"
                >
                    View our offers
                </a>
            </section>

            <section className="border rounded-lg shadow-lg p-8 mb-8">
                <h1>User Table</h1>
                <UserTable />
            </section>

            <section className="border rounded-lg shadow-lg p-8" id="offers">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl">Item Overview</h1>
                    <Images className="w-8 h-8 text-gray-600" />
                </div>

                <div className="border-t py-4">
                    <h2 className="text-xl font-semibold">Fruits</h2>
                    <div>{items && <ItemOverview items={fruits} />}</div>
                </div>

                <div className="border-t py-4">
                    <h2 className="text-xl font-semibold">Vegetables</h2>
                    <div>{items && <ItemOverview items={vegetables} />}</div>
                </div>

                <div className="border-t py-4">
                    <h2 className="text-xl font-semibold">dairy</h2>
                    <div>{items && <ItemOverview items={dairy} />}</div>
                </div>

                <div className="border-t py-4">
                    <h2 className="text-xl font-semibold">meat</h2>
                    <div>{items && <ItemOverview items={meat} />}</div>
                </div>

                <div className="border-t py-4">
                    <h2 className="text-xl font-semibold">fish</h2>
                    <div>{items && <ItemOverview items={fish} />}</div>
                </div>
            </section>
        </>
    );
};

export default ItemPage;

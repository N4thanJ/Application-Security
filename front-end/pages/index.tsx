import ItemOverview from '@components/items/ItemOverview';
import UserTable from '@components/users/UserTable';
import ItemsService from '@services/ItemsService';
import { Item, User } from '@types';
import { Images } from 'lucide-react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

const ItemPage: React.FC = () => {
    const { t } = useTranslation();
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

            console.log(fruits);

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
                <title>{t('item_page.title')}</title>
            </Head>

            <section className="border rounded-lg shadow-lg p-8 mb-8">
                <h1>{t('item_page.welcome_message')}</h1>
                <p>{t('item_page.intro_paragraph_1')}</p>
                <p>{t('item_page.intro_paragraph_2')}</p>
                <a
                    href="#offers"
                    className="bg-blue-600 text-white p-2 mt-4 inline-block rounded-lg shadow-lg hover:bg-blue-700/80 transition-all duration-300"
                >
                    {t('item_page.view_offers_button')}
                </a>
            </section>

            <section className="border rounded-lg shadow-lg p-8 mb-8">
                <h1>{t('item_page.user_table_title')}</h1>
                <UserTable />
            </section>

            <section className="border rounded-lg shadow-lg p-8" id="offers">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl">{t('item_page.item_overview_title')}</h1>
                    <Images className="w-8 h-8 text-gray-600" />
                </div>

                <div className="border-t py-4">
                    <h2 className="text-xl font-semibold">{t('item_page.categories.fruits')}</h2>
                    <div>{items && <ItemOverview items={fruits} />}</div>
                </div>

                <div className="border-t py-4">
                    <h2 className="text-xl font-semibold">
                        {t('item_page.categories.vegetables')}
                    </h2>
                    <div>{items && <ItemOverview items={vegetables} />}</div>
                </div>

                <div className="border-t py-4">
                    <h2 className="text-xl font-semibold">{t('item_page.categories.dairy')}</h2>
                    <div>{items && <ItemOverview items={dairy} />}</div>
                </div>

                <div className="border-t py-4">
                    <h2 className="text-xl font-semibold">{t('item_page.categories.meat')}</h2>
                    <div>{items && <ItemOverview items={meat} />}</div>
                </div>

                <div className="border-t pt-4">
                    <h2 className="text-xl font-semibold">{t('item_page.categories.fish')}</h2>
                    <div>{items && <ItemOverview items={fish} />}</div>
                </div>
            </section>
        </>
    );
};

export const getServerSideProps = async (context: any) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

export default ItemPage;

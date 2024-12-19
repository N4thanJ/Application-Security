import AddItemToShoppingcartOverview from '@components/items/AddItemToShoppingcartOverview';
import ItemsService from '@services/ItemsService';
import ShoppingcartService from '@services/ShopingcartService';
import { Item, Shoppingcart, User } from '@types';
import { X } from 'lucide-react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';

const addItemsToShoppingcart: React.FC = () => {
    const router = useRouter();
    const { shoppingcartId } = router.query;

    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    const { t } = useTranslation();

    const fetchItemsAndShoppingcartById = async () => {
        const token = JSON.parse(sessionStorage.getItem('loggedInUser') as string).token;

        const reponses = await Promise.all([
            ItemsService.getAllItems(),
            ShoppingcartService.getShoppingcartById(token, shoppingcartId as string),
        ]);

        const [itemResponse, shoppingcartResponse] = reponses;

        if (itemResponse && shoppingcartResponse) {
            if (itemResponse.ok && shoppingcartResponse.ok) {
                const items = await itemResponse.json();
                const shoppingcart = await shoppingcartResponse.json();

                return { items, shoppingcart };
            }
        }
    };

    const { data, isLoading, error } = useSWR(
        'itemsAndShoppingcart',
        fetchItemsAndShoppingcartById
    );

    useInterval(() => {
        mutate('itemdAndShoppingcart', fetchItemsAndShoppingcartById);
    }, 2000);

    const addItemToShoppingcart = async (item: Item, shoppingcart: Shoppingcart) => {
        try {
            const token = JSON.parse(sessionStorage.getItem('loggedInUser') as string).token;
            const response = await ShoppingcartService.addItemToShoppingcart(
                token,
                Number(item.id),
                Number(shoppingcart.id)
            );

            if (response) {
                const updatedShoppingcart = await response.json();
                mutate('itemsAndShoppingcart', { ...data, shoppingcart: updatedShoppingcart });
            }
        } catch (error) {
            console.error('Error fetching shoppingcart:', error);
        }
    };

    const handleQuantityChange = async (
        item: Item,
        shoppingcart: Shoppingcart,
        quantity: number
    ) => {
        try {
            const token = JSON.parse(sessionStorage.getItem('loggedInUser') as string).token;
            const response = await ShoppingcartService.updateItemQuantityInShoppingcart(
                token,
                Number(item.id),
                Number(shoppingcart.id),
                quantity
            );

            if (response) {
                const updatedShoppingcart = await response.json();
                mutate('itemsAndShoppingcart', { ...data, shoppingcart: updatedShoppingcart });
            }
        } catch (error) {
            console.error('Error fetching shoppingcart:', error);
        }
    };

    useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem('loggedInUser') || 'null');
        setLoggedInUser(token);
    });

    if (!loggedInUser) {
        return (
            <p className="py-56 text-lg text-red-600 text-center italic font-bold">
                {t('loginwarning')}
            </p>
        );
    }

    if (isLoading) {
        return <p>{t('loading')}</p>;
    }

    return (
        <section>
            <div className="pb-8 pt-4 gap-4">
                <Link
                    href={`/shoppingcart/${data && data.shoppingcart?.id}`}
                    className="bg-green-500 hover:bg-green-500/70 transition-all duration-300 text-white px-2 py-1 rounded-lg"
                >
                    Go back
                </Link>
                <h1 className="text-2xl font-semibold mt-4">
                    Add Items to {data && data.shoppingcart?.name}
                </h1>
            </div>

            {data?.shoppingcart && data.items && data.shoppingcart.items && (
                <AddItemToShoppingcartOverview
                    items={data.items}
                    shoppingcart={data.shoppingcart}
                    selectedItem={setSelectedItem}
                    addItemToShoppingcart={addItemToShoppingcart}
                    handleQuantityChange={handleQuantityChange}
                />
            )}
        </section>
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

export default addItemsToShoppingcart;

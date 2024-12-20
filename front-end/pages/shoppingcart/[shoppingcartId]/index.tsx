import ShoppingcartCheckoutComponent from '@components/shoppingcart/ShoppingcartCheckoutComponent';
import ShoppingcartService from '@services/ShopingcartService';
import { Item, Shoppingcart, User } from '@types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import useSWR, { mutate } from 'swr';
import React from 'react';

const CartViewer: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const params = useParams<{ shoppingcartId?: string }>();
    const shoppingcartId = params?.shoppingcartId;
    const { t } = useTranslation();

    const onDeleteItemFromShoppingcart = async (itemId: number, shoppingcartId: number) => {
        try {
            const token = JSON.parse(sessionStorage.getItem('loggedInUser') as string).token;
            const response = await ShoppingcartService.deleteItemFromShoppingcart(
                token,
                itemId,
                shoppingcartId
            );
            if (response) {
                const updatedShoppingcart: Shoppingcart = await response.json();
                mutate('shoppingcart', updatedShoppingcart);
            }
        } catch (error) {
            console.error(error);
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
                mutate('shoppingcart', updatedShoppingcart);
            }
        } catch (error) {
            console.error('Error fetching shoppingcart:', error);
        }
    };

    const getShoppingcartById = async () => {
        const token = JSON.parse(sessionStorage.getItem('loggedInUser') as string).token;
        const response = await ShoppingcartService.getShoppingcartById(
            token,
            shoppingcartId as string
        );

        if (response) {
            const shoppingcart = await response.json();
            return shoppingcart;
        }
    };

    const { data, isLoading, error } = useSWR('shoppingcart', getShoppingcartById);

    useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem('loggedInUser') || 'null');
        setLoggedInUser(token);
    }, [shoppingcartId]);

    if (!loggedInUser) {
        return (
            <p className="py-56 text-lg text-red-600 text-center italic font-bold">
                {t('loginwarning')}
            </p>
        );
    }

    if (isLoading) {
        return <p>{t('loading...')}</p>;
    }

    return (
        <>
            {data && (
                <div>
                    {error && <p>{error}</p>}
                    <ShoppingcartCheckoutComponent
                        shoppingcart={data}
                        onDeleteItemFromShoppingcart={onDeleteItemFromShoppingcart}
                        handleQuantityChange={handleQuantityChange}
                    />
                </div>
            )}
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

export default CartViewer;

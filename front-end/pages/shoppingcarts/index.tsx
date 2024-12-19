import ShoppingcartOverview from '@components/shoppingcart/ShoppingcartOverview';
import ShoppingcartService from '@services/ShopingcartService';
import UserService from '@services/userService';
import { User } from '@types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';
import { useTranslation } from 'next-i18next';

const Home: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const { t } = useTranslation();

    const getUserByEmail = async (email: string) => {
        const token = JSON.parse(sessionStorage.getItem('loggedInUser') as string).token;
        const response = await UserService.getUserByEmail(token, email);
        const user = await response.json();
        return user;
    };

    const deleteShoppingcartById = async (id: number) => {
        try {
            const token = JSON.parse(sessionStorage.getItem('loggedInUser') as string).token;
            const deletedShoppingcart = await ShoppingcartService.deleteShoppingcartById(token, id);
            if (!deletedShoppingcart || !deletedShoppingcart.ok) {
                throw new Error('Shoppingcart not found');
            }
            mutate('user', getUserByEmail(loggedInUser?.email as string));
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const { data, isLoading, error } = useSWR(
        loggedInUser?.email ? ['user', loggedInUser.email] : null,
        () => getUserByEmail(loggedInUser?.email as string)
    );

    useInterval(() => {
        loggedInUser?.email && mutate(['user', loggedInUser.email]);
    }, 100);

    useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem('loggedInUser') || 'null');
        setLoggedInUser(token);
    }, []);

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
        <section className="shadow-lg p-8 border rounded-lg">
            {data?.shoppingcarts && data.shoppingcarts.length > 0 ? (
                <ShoppingcartOverview
                    shoppingcarts={data.shoppingcarts}
                    deleteShoppingcartById={deleteShoppingcartById}
                />
            ) : (
                <>
                    <h3>You currently don't have any shoppingcarts :(</h3>
                    <Link
                        href={'/shoppingcarts/addShoppingcart'}
                        className="inline-block mt-6 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
                        type="submit"
                    >
                        Create one!
                    </Link>
                </>
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

export default Home;

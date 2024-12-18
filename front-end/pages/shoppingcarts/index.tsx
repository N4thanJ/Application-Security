import ShoppingcartOverview from '@components/shoppingcart/ShoppingcartOverview';
import ShoppingcartService from '@services/ShopingcartService';
import UserService from '@services/userService';
import { User } from '@types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useInterval from 'use-interval';

const Home: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const fetchUser = async () => {
        try {
            if (!loggedInUser) {
                return;
            }

            const response = await UserService.getUserByEmail(loggedInUser.email);

            if (!response.ok) {
                throw new Error('User not found');
            }

            const fetchedUser = await response.json();
            setUser(fetchedUser);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const deleteShoppingcartById = async (id: number) => {
        try {
            const deletedShoppingcart = await ShoppingcartService.deleteShoppingcartById(id);
            if (!deletedShoppingcart || !deletedShoppingcart.ok) {
                throw new Error('Shoppingcart not found');
            }
            fetchUser();
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem('loggedInUser') || 'null');
        setLoggedInUser(token);
    }, []);

    useEffect(() => {
        if (loggedInUser) {
            fetchUser();
        }
    }, [loggedInUser]);

    if (!loggedInUser) {
        return (
            <p className="py-56 text-lg text-red-600 text-center italic font-bold">
                Please log in to view this page.
            </p>
        );
    }

    return (
        <section className="shadow-lg p-8 border rounded-lg">
            {user?.shoppingcarts && user.shoppingcarts.length > 0 ? (
                <ShoppingcartOverview
                    shoppingcarts={user.shoppingcarts}
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

export default Home;

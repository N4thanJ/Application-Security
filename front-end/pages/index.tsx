import ShoppingcartOverview from '@components/shoppingcart/ShoppingcartOverview';
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
            <p className="pt-4 text-lg text-red-600 text-center italic font-bold">
                Please log in to view this page.
            </p>
        );
    }

    return (
        <section className="shadow-lg p-8 border rounded-lg">
            {user && user.shoppingcarts.length > 0 ? (
                <ShoppingcartOverview shoppingcarts={user.shoppingcarts} />
            ) : (
                <>
                    <h3>You currently don't have any shoppingcarts :(</h3>
                    <Link
                        href={'/addShoppingcart'}
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

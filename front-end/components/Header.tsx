import { User } from '@types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useInterval from 'use-interval';

const Header: React.FC = () => {
    const router = useRouter();
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    const logOut = () => {
        sessionStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
        router.push('/login');
    };

    const getLoggedInUser = () => {
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser') as string);
        loggedInUser && setLoggedInUser(loggedInUser);
    };

    useEffect(() => {
        getLoggedInUser();
    }, []);

    useInterval(() => {
        getLoggedInUser();
    }, 1000);

    return (
        <header className="bg-primary text-white flex justify-between uppercase py-6">
            <div className="max-w-7xl px-8 mx-auto flex justify-between w-full">
                <h1 className="text-lg font-bold">Shoppingcart app</h1>
                <nav className="">
                    <ul className="flex gap-4">
                        {loggedInUser && (
                            <>
                                <li>
                                    <Link href="/">Home</Link>
                                </li>
                                <li>
                                    <Link href="/shoppingcarts">Shoppingcarts</Link>
                                </li>

                                {loggedInUser.role === 'admin' && (
                                    <li>
                                        <Link href="/itemOverview">Admin items overview</Link>
                                    </li>
                                )}
                                {loggedInUser.role === 'admin' && (
                                    <li>
                                        <Link href="/adminUsersOverview">Admin users overview</Link>
                                    </li>
                                )}
                            </>
                        )}

                        {loggedInUser ? (
                            <li>
                                <Link onClick={logOut} href={'/login'}>
                                    Logout
                                </Link>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link href="/login">Login</Link>
                                </li>
                                <li>
                                    <Link href="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;

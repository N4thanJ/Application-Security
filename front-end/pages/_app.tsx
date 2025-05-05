import Layout from '@components/Layout';
import '@styles/globals.css';
import { User } from '@types';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Lexend } from 'next/font/google';
import React, { createContext, useEffect, useState } from 'react';

const lexend = Lexend({ subsets: ['latin'] });

interface UserContextType {
    loggedInUser: User | null;
    setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType>({
    loggedInUser: null,
    setLoggedInUser: () => {},
});

const App = ({ Component, pageProps }: AppProps) => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('loggedInUser');
        setLoggedInUser(storedUser ? JSON.parse(storedUser) : null);
    }, []);

    return (
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            <Layout className={lexend.className}>
                <Component {...pageProps} />
            </Layout>
        </UserContext.Provider>
    );
};

export default appWithTranslation(App);

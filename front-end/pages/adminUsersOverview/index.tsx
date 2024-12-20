import { Plus } from 'lucide-react';
import Link from 'next/link';
import UserAdminOverview from '@components/users/UserAdminOverview';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { User } from '@types';
import UserService from '@services/userService';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import React from 'react';

const AdminUserPage: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const { t } = useTranslation();

    const handleDeleteUser = async (id: number): Promise<void> => {
        try {
            const token = JSON.parse(sessionStorage.getItem('loggedInUser') as string).token;
            await UserService.deleteUser(token, id);
            mutate('users', getAllUsers());
        } catch (error) {
            console.error(error);
        }
    };

    const getAllUsers = async () => {
        try {
            const token = JSON.parse(sessionStorage.getItem('loggedInUser') as string)?.token;
            if (!token) throw new Error('No token found.');

            const response = await UserService.getAllUsers(token);
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);

            const users = await response.json();
            return Array.isArray(users) ? users : [];
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    };

    const { data, isLoading, error } = useSWR('users', getAllUsers);

    useInterval(() => {
        mutate('users', getAllUsers());
    }, 2000);

    useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem('loggedInUser') || 'null');
        setLoggedInUser(token);
    }, []);

    if (!loggedInUser || (loggedInUser.role !== 'admin' && loggedInUser.role !== 'manager')) {
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
            <Head>
                <title>{t('pagetitles.adminuserpage')}</title>
            </Head>
            <h1 className="mb-4">{t('pagetitles.adminuserpage')}</h1>

            <section>
                <div>
                    {error && <p>{error}</p>}
                    {data && <UserAdminOverview users={data} handleDeleteUser={handleDeleteUser} />}
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

export default AdminUserPage;

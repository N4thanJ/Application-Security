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

const AdminUserPage: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const { t } = useTranslation();

    const handleDeleteUser = async (id: number): Promise<void> => {
        try {
            const token = JSON.parse(sessionStorage.getItem('loggedInUser') as string).token;
            const deletedUser = await UserService.deleteUser(token, id);
            mutate('users', deletedUser);
        } catch (error) {
            console.error(error);
        }
    };

    const getAllUsers = async () => {
        const token = JSON.parse(sessionStorage.getItem('loggedInUser') as string).token;
        const response = await UserService.getAllUsers(token);

        const users = await response.json();
        return users;
    };

    const { data, isLoading, error } = useSWR('users', getAllUsers);

    useInterval(() => {
        mutate('users', getAllUsers());
    }, 1000);

    useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem('loggedInUser') || 'null');
        setLoggedInUser(token);
    }, []);

    if (!loggedInUser || loggedInUser.role !== 'admin') {
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
            <div className="flex items-center gap-4 mb-4">
                <h1>{t('pagetitles.adminuserpage')}</h1>
                <Link
                    href={`adminUsersOverview/addUser`}
                    className="p-1 bg-green-400 rounded-lg text-white hover:bg-green-600 transition-all"
                >
                    <Plus size={24} />
                </Link>
            </div>

            <section>
                <div>
                    {error && <p>{error}</p>}
                    <UserAdminOverview users={data} handleDeleteUser={handleDeleteUser} />
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

import { User } from '@types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import UserService from '@services/userService';
import UserEditForm from '@components/users/UserEditForm';
import Head from 'next/head';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import React from 'react';

const EditUserPage: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const params = useParams<{ userId?: string }>();
    const userId = params?.userId;
    const { t } = useTranslation();

    const getUserById = async (id: string) => {
        const token = JSON.parse(sessionStorage.getItem('loggedInUser') as string).token;
        const response = await UserService.getUserById(token, id);

        const user = await response.json();
        return user;
    };

    const { data, isLoading, error } = useSWR(userId ? ['user', userId] : null, () =>
        getUserById(userId as string)
    );

    useInterval(() => {
        userId && mutate('users', getUserById(userId));
    }, 1000);

    useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem('loggedInUser') || 'null');
        setLoggedInUser(token);
    }, [userId]);

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
                <title>{t('pagetitles.editUser')}</title>
            </Head>
            <section>
                <div>
                    {error && <p className="text-center text-red-600">{error}</p>}
                    {data && <UserEditForm initialUser={data} />}
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

export default EditUserPage;

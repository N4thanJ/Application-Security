import AddItemForm from '@components/items/AddItemForm';
import { User } from '@types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import React from 'react';

const AddItemPage: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const { t } = useTranslation();

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

    return (
        <>
            <Head>
                <title>{t('pagetitles.additem')}</title>
            </Head>
            <AddItemForm />
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

export default AddItemPage;

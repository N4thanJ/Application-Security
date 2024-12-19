import { Item, User } from '@types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import ItemService from '@services/ItemsService';
import AddNutritionLabelForm from '@components/nutritionlabel/AddNutritionlabelForm';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';

const NutritionlabelForm: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const params = useParams<{ itemId?: string }>();
    const itemId = params?.itemId;
    const { t } = useTranslation();

    const fetchItem = async () => {
        const token = JSON.parse(sessionStorage.getItem('loggedInUser') as string).token;
        const response = await ItemService.getItemById(token, String(itemId));

        const item = await response.json();
        return item;
    };

    const { data, isLoading, error } = useSWR('item', fetchItem);

    useInterval(() => {
        mutate('item', fetchItem);
    }, 2000);

    useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem('loggedInUser') || 'null');
        setLoggedInUser(token);
    }, [itemId]);

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
                <title>{t('pagetitles.nutritionlabelform')}</title>
            </Head>
            {error && <p>Error...</p>}
            <section>{data && <AddNutritionLabelForm item={data} />}</section>
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

export default NutritionlabelForm;

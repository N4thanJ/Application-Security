import UserRegisterForm from '@components/users/UserRegisterForm';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import React from 'react';

const Register: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>{t('pagetitles.register')}</title>
            </Head>
            <section className="flex flex-col items-center py-16">
                <UserRegisterForm />
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

export default Register;

import UserRegisterForm from '@components/users/UserRegisterForm';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

const Register: React.FC = () => {
    return (
        <>
            <Head>
                <title>Register a new accoutn</title>
            </Head>
            <section className="flex flex-col items-center py-16">
                <UserRegisterForm />
            </section>
        </>
    );
};

export const getServerSideProps = async (context) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};

export default Register;

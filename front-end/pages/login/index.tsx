import UserLoginForm from '@components/users/UserLoginForm';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <section className="flex flex-col items-center py-16">
                <UserLoginForm />
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

export default Login;

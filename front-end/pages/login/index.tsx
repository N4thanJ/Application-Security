import UserLoginForm from '@components/users/UserLoginForm';
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

export default Login;

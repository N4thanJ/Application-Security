import UserRegisterForm from '@components/users/UserRegisterForm';
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

export default Register;

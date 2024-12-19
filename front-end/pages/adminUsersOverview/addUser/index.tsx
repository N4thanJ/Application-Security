import CreateUserForm from '@components/users/CreateUserForm';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const AddUser: React.FC = () => {
    return (
        <section className="flex flex-col items-center py-16">
            <CreateUserForm />
        </section>
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

export default AddUser;

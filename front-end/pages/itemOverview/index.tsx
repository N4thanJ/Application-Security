import { Plus } from 'lucide-react';
import Link from 'next/link';
import ItemAdminOverview from '@components/items/ItemsAdminOverview';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { User } from '@types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const AdminPage: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem('loggedInUser') || 'null');
        setLoggedInUser(token);
    }, []);

    if (!loggedInUser || loggedInUser.role !== 'admin') {
        return (
            <p className="py-56 text-lg text-red-600 text-center italic font-bold">
                Please log in to view this page.
            </p>
        );
    }

    return (
        <>
            <Head>
                <title>Admin Item Overview</title>
            </Head>
            <div className="flex items-center gap-4 mb-4">
                <h1>Admin Overview Page</h1>
                <Link
                    href={`itemOverview/addItem`}
                    className="p-1 bg-green-400 rounded-lg text-white hover:bg-green-600 transition-all"
                >
                    <Plus size={24} />
                </Link>
            </div>

            <section>
                <ItemAdminOverview />
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

export default AdminPage;

import AddItemForm from '@components/items/AddItemForm';
import { User } from '@types';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const NutritionlabelForm: React.FC = () => {
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
                <title>Add Item</title>
            </Head>
            <AddItemForm />
        </>
    );
};

export default NutritionlabelForm;

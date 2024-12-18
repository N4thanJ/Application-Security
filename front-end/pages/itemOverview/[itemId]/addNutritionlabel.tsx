import { Item, User } from '@types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import ItemService from '@services/ItemsService';
import AddNutritionLabelForm from '@components/nutritionlabel/AddNutritionlabelForm';
import Head from 'next/head';

const NutritionlabelForm: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const params = useParams<{ itemId?: string }>();
    const itemId = params?.itemId;
    const [item, setItem] = useState<Item>();

    useEffect(() => {
        if (!itemId) return;
        const fetchItem = async () => {
            try {
                const response = await ItemService.getItemById(String(itemId));
                const fetchedItem = await response.json();
                setItem(fetchedItem);
            } catch (error) {
                console.error('Error fetching item:', error);
            }
        };

        const token = JSON.parse(sessionStorage.getItem('loggedInUser') || 'null');
        setLoggedInUser(token);

        fetchItem();
    }, [itemId]);

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
                <title>Add Nutritionlabel To Item</title>
            </Head>
            <section>{item && <AddNutritionLabelForm item={item} />}</section>
        </>
    );
};

export default NutritionlabelForm;

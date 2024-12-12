import ItemOverview from '@components/items/ItemOverview';
import ItemsOverview from '@components/items/ItemOverview';
import NutritionLabel from '@components/items/NutritionLabel';
import ItemsService from '@services/ItemsService';
import ShoppingcartService from '@services/ShopingcartService';
import { Item, Shoppingcart, User } from '@types';
import { X } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const addItemsToShoppingcart: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [items, setItems] = useState<Item[] | []>([]);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    const router = useRouter();
    const { shoppingcartId } = router.query;

    const getItems = async () => {
        const response = await ItemsService.getAllItems();
        const items = await response.json();
        setItems(items);
    };

    const [shoppingcart, setShoppingcart] = useState<Shoppingcart>();

    useEffect(() => {
        if (!shoppingcartId) return;

        const fetchShoppingcart = async () => {
            try {
                const response = await ShoppingcartService.getShoppingcartById(
                    String(shoppingcartId)
                );

                if (response) {
                    const fetchedShoppingcart = await response.json();
                    console.log(fetchShoppingcart);
                    setShoppingcart(fetchedShoppingcart);
                } else {
                    console.error('Error fetching shoppingcart:', response);
                }
            } catch (error) {
                console.error('Error fetching shoppingcart:', error);
            }
        };

        const getItems = async () => {
            const response = await ItemsService.getAllItems();
            const items = await response.json();
            setItems(items);
        };

        const token = JSON.parse(sessionStorage.getItem('loggedInUser') || 'null');
        setLoggedInUser(token);
        fetchShoppingcart();
        getItems();
    }, [shoppingcartId]);

    return (
        <section>
            <h1 className="mb-8">Add Items to "{shoppingcart?.name}"</h1>

            {selectedItem && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setSelectedItem(null)}
                >
                    <div
                        className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <X
                            className="absolute top-3 right-3 text-gray-500 hover:text-red-700 transition-all cursor-pointer"
                            onClick={() => setSelectedItem(null)}
                            size={32}
                        />
                        <NutritionLabel item={selectedItem} />
                    </div>
                </div>
            )}
        </section>
    );
};

export default addItemsToShoppingcart;

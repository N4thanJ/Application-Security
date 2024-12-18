import AddItemToShoppingcartOverview from '@components/items/AddItemToShoppingcartOverview';
import ItemsService from '@services/ItemsService';
import ShoppingcartService from '@services/ShopingcartService';
import { Item, Shoppingcart, User } from '@types';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const addItemsToShoppingcart: React.FC = () => {
    const router = useRouter();
    const { shoppingcartId } = router.query;

    const [items, setItems] = useState<Item[]>([]);

    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    const [shoppingcart, setShoppingcart] = useState<Shoppingcart>();

    const fetchItems = async () => {
        try {
            const response = await ItemsService.getAllItems();
            const fetchedItems: Item[] = await response.json();
            setItems(fetchedItems);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchShoppingcart = async () => {
        try {
            const response = await ShoppingcartService.getShoppingcartById(String(shoppingcartId));

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

    const addItemToShoppingcart = async (item: Item, shoppingcart: Shoppingcart) => {
        try {
            const response = await ShoppingcartService.addItemToShoppingcart(
                Number(item.id),
                Number(shoppingcart.id)
            );

            if (response) {
                const updatedShoppingcart = await response.json();
                setShoppingcart(updatedShoppingcart);
            }
        } catch (error) {
            console.error('Error fetching shoppingcart:', error);
        }
    };

    const removeAnItemFromShoppingcart = async (item: Item, shoppingcart: Shoppingcart) => {
        try {
            const response = await ShoppingcartService.removeAnItem(
                Number(item.id),
                Number(shoppingcart.id)
            );

            if (response) {
                const updatedShoppingcart = await response.json();
                setShoppingcart(updatedShoppingcart);
            }
        } catch (error) {
            console.error('Error fetching shoppingcart:', error);
        }
    };

    const handleQuantityChange = async (
        item: Item,
        shoppingcart: Shoppingcart,
        quantity: number
    ) => {
        try {
            const response = await ShoppingcartService.updateItemQuantityInShoppingcart(
                Number(item.id),
                Number(shoppingcart.id),
                quantity
            );

            if (response) {
                const updatedShoppingcart = await response.json();
                setShoppingcart(updatedShoppingcart);
            }
        } catch (error) {
            console.error('Error fetching shoppingcart:', error);
        }
    };

    useEffect(() => {
        // Getting token & setting token
        const token = JSON.parse(sessionStorage.getItem('loggedInUser') || 'null');
        setLoggedInUser(token);

        fetchItems();
        fetchShoppingcart();
    }, [shoppingcartId]);

    return (
        <section>
            <div className="pb-8 pt-4 gap-4">
                <Link
                    href={`/shoppingcart/${shoppingcart?.id}`}
                    className="bg-green-500 hover:bg-green-500/70 transition-all duration-300 text-white px-2 py-1 rounded-lg"
                >
                    Go back
                </Link>
                <h1 className="text-2xl font-semibold mt-4">Add Items to {shoppingcart?.name}</h1>
            </div>

            {shoppingcart && items && shoppingcart.items && (
                <AddItemToShoppingcartOverview
                    items={items}
                    shoppingcart={shoppingcart}
                    selectedItem={setSelectedItem}
                    removeAnItemFromShoppingcart={removeAnItemFromShoppingcart}
                    addItemToShoppingcart={addItemToShoppingcart}
                    handleQuantityChange={handleQuantityChange}
                />
            )}
        </section>
    );
};

export default addItemsToShoppingcart;

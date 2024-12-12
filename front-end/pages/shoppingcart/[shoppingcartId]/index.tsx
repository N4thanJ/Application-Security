import ShoppingcartCheckoutComponent from '@components/shoppingcart/ShoppingcartCheckoutComponent';
import ShoppingcartService from '@services/ShopingcartService';
import { Shoppingcart, User } from '@types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const CartViewer: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    const params = useParams<{ shoppingcartId?: string }>();
    const shoppingcartId = params?.shoppingcartId;

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

        const token = JSON.parse(sessionStorage.getItem('loggedInUser') || 'null');
        setLoggedInUser(token);

        fetchShoppingcart();
    }, [shoppingcartId]);

    if (!loggedInUser) {
        return (
            <p className="pt-4 text-lg text-red-600 text-center italic font-bold">
                Unauthorized to access this page!
            </p>
        );
    }

    if (!shoppingcart) {
        return <p>Loading...</p>;
    }

    return <ShoppingcartCheckoutComponent shoppingcart={shoppingcart} />;
};

export default CartViewer;

import ShoppingcartCheckoutComponent from '@components/shoppingcart/ShoppingcartCheckoutComponent';
import ShoppingcartService from '@services/ShopingcartService';
import { Item, Shoppingcart, User } from '@types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const CartViewer: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    const params = useParams<{ shoppingcartId?: string }>();
    const shoppingcartId = params?.shoppingcartId;

    const [shoppingcart, setShoppingcart] = useState<Shoppingcart>();

    const onDeleteItemFromShoppingcart = async (itemId: number, shoppingcartId: number) => {
        try {
            const token = JSON.parse(sessionStorage.getItem('loggedInUser') as string).token;
            const response = await ShoppingcartService.deleteItemFromShoppingcart(
                token,
                itemId,
                shoppingcartId
            );
            if (response) {
                const updatedShoppingcart: Shoppingcart = await response.json();
                setShoppingcart(updatedShoppingcart);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleQuantityChange = async (
        item: Item,
        shoppingcart: Shoppingcart,
        quantity: number
    ) => {
        try {
            const token = JSON.parse(sessionStorage.getItem('loggedInUser') as string).token;
            const response = await ShoppingcartService.updateItemQuantityInShoppingcart(
                token,
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
        if (!shoppingcartId) return;

        const fetchShoppingcart = async () => {
            try {
                const token = JSON.parse(sessionStorage.getItem('loggedInUser') as string).token;
                const response = await ShoppingcartService.getShoppingcartById(
                    token,
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
            <p className="py-56 text-lg text-red-600 text-center italic font-bold">
                Please log in to view this page.
            </p>
        );
    }

    if (!shoppingcart) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {shoppingcart && (
                <ShoppingcartCheckoutComponent
                    shoppingcart={shoppingcart}
                    onDeleteItemFromShoppingcart={onDeleteItemFromShoppingcart}
                    handleQuantityChange={handleQuantityChange}
                />
            )}
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

export default CartViewer;

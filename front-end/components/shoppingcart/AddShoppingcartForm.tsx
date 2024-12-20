import ShoppingcartService from '@services/ShopingcartService';
import { Shoppingcart } from '@types';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import React from 'react';

const AddShoppingcartForm: React.FC = () => {
    const router = useRouter();
    const dateInputRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation('common');

    const [shoppingcart, setShoppingcart] = useState<Shoppingcart>({
        name: '',
        deliveryDate: new Date(),
        items: [],
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShoppingcart((prev) => ({
            ...prev,
            [name]: name === 'deliveryDate' ? new Date(value) : value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const token = JSON.parse(sessionStorage.getItem('loggedInUser') as string).token;
            await ShoppingcartService.addShoppingcart(token, shoppingcart);
            router.push('/shoppingcarts');
        } catch (error) {
            console.error('Error adding shoppingcart:', error);
        }
    };

    const handleDateClick = () => {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker();
        }
    };

    useEffect(() => {
        if (dateInputRef.current) {
            dateInputRef.current.addEventListener('click', handleDateClick);
        }
        return () => {
            if (dateInputRef.current) {
                dateInputRef.current.removeEventListener('click', handleDateClick);
            }
        };
    }, []);

    const minDate = new Date();
    minDate.setDate(minDate.getDate());
    const minDateString = minDate.toISOString().split('T')[0];

    const valueDate = shoppingcart.deliveryDate
        ? shoppingcart.deliveryDate.toISOString().split('T')[0]
        : minDateString;

    return (
        <>
            <h1>{t('AddShoppingcartForm.title')}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
                        {t('AddShoppingcartForm.labels.name')}:
                    </label>
                    <input
                        type="text"
                        id="name"
                        required
                        name="name"
                        value={shoppingcart.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder={t('AddShoppingcartForm.placeholders.name')}
                    />
                </div>

                <div>
                    <label htmlFor="deliveryDate" className="text-sm font-medium text-gray-700">
                        {t('AddShoppingcartForm.labels.deliveryDate')}:
                    </label>
                    <div className="mt-1 relative">
                        <input
                            type="date"
                            id="deliveryDate"
                            ref={dateInputRef}
                            required
                            name="deliveryDate"
                            value={valueDate}
                            onChange={handleInputChange}
                            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                            min={minDateString}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    {t('AddShoppingcartForm.buttons.create')}
                </button>
            </form>
        </>
    );
};

export default AddShoppingcartForm;

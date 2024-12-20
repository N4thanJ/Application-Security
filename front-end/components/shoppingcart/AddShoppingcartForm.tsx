import ShoppingcartService from '@services/ShopingcartService';
import { Shoppingcart } from '@types';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import React from 'react';

const AddShoppingcartForm: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation('common');

    const [shoppingcart, setShoppingcart] = useState<Shoppingcart>({
        name: '',
        deliveryDate: new Date(),
        items: [],
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState<{
        type: 'error' | 'success';
        text: string;
    } | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShoppingcart((prev) => ({
            ...prev,
            [name]: name === 'deliveryDate' ? new Date(value) : value,
        }));
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const validateForm = (): boolean => {
        if (!shoppingcart.name) {
            setStatusMessage({ type: 'error', text: t('AddShoppingcartForm.errors.missingName') });
            return false;
        }

        if (!shoppingcart.deliveryDate || new Date(shoppingcart.deliveryDate) < today) {
            setStatusMessage({
                type: 'error',
                text: t('AddShoppingcartForm.errors.invalidDeliveryDate'),
            });
            return false;
        }
        return true;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setStatusMessage(null);

        try {
            const token = JSON.parse(sessionStorage.getItem('loggedInUser') as string)?.token;
            if (!token) throw new Error(t('AddShoppingcartForm.errors.missingToken'));

            const response = await ShoppingcartService.addShoppingcart(token, shoppingcart);
            if (response && response.ok) {
                setStatusMessage({ type: 'success', text: t('AddShoppingcartForm.success') });
                setTimeout(() => router.push('/shoppingcarts'), 1500);
            } else {
                const errorMsg =
                    (response && (await response.json()).message) ||
                    t('AddShoppingcartForm.errors.generic');
                throw new Error(errorMsg);
            }
        } catch (error: any) {
            setStatusMessage({
                type: 'error',
                text: error.message || t('AddShoppingcartForm.errors.generic'),
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const minDate = new Date().toISOString().split('T')[0];
    const valueDate = shoppingcart.deliveryDate?.toISOString().split('T')[0] || minDate;

    return (
        <>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                {t('AddShoppingcartForm.title')}
            </h1>
            <form onSubmit={handleSubmit}>
                {statusMessage && (
                    <div
                        className={`mb-4 p-3 rounded-md text-center font-medium ${
                            statusMessage.type === 'error'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-green-100 text-green-700'
                        }`}
                    >
                        {statusMessage.text}
                    </div>
                )}

                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        {t('AddShoppingcartForm.labels.name')}:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={shoppingcart.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder={t('AddShoppingcartForm.placeholders.name')}
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="deliveryDate"
                        className="block text-sm font-medium text-gray-700"
                    >
                        {t('AddShoppingcartForm.labels.deliveryDate')}:
                    </label>
                    <input
                        type="date"
                        id="deliveryDate"
                        name="deliveryDate"
                        value={valueDate}
                        onChange={handleInputChange}
                        required
                        min={minDate}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        isSubmitting
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                    }`}
                >
                    {isSubmitting
                        ? t('AddShoppingcartForm.loading')
                        : t('AddShoppingcartForm.buttons.create')}
                </button>
            </form>
        </>
    );
};

export default AddShoppingcartForm;

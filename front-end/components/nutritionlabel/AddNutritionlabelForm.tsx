import { useState } from 'react';
import ItemService from '@services/ItemsService';
import { Item, Nutritionlabel } from '@types';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import React from 'react';

type Props = {
    item: Item;
};

const AddNutritionLabelForm: React.FC<Props> = ({ item }: Props) => {
    const router = useRouter();
    const { t } = useTranslation('common');
    const [nutritionlabel, setNutritionlabel] = useState<Nutritionlabel>({
        id: item.nutritionlabel?.id,
        energy: item.nutritionlabel?.energy || 0,
        fat: item.nutritionlabel?.fat || 0,
        saturatedFats: item.nutritionlabel?.saturatedFats || 0,
        carbohydrates: item.nutritionlabel?.carbohydrates || 0,
        sugar: item.nutritionlabel?.sugar || 0,
        protein: item.nutritionlabel?.protein || 0,
        salts: item.nutritionlabel?.salts || 0,
        item: item || undefined,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState<{
        type: 'error' | 'success';
        text: string;
    } | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNutritionlabel((prev) => ({
            ...prev,
            [name]: value === '' ? '' : Number(value),
        }));
    };

    const validateForm = (): boolean => {
        const errors: string[] = [];
        if (nutritionlabel.energy <= 0)
            errors.push(t('AddNutritionLabelForm.errors.energyPositive'));
        if (nutritionlabel.fat < 0) errors.push(t('AddNutritionLabelForm.errors.fatNonNegative'));
        // Add additional checks for other fields if necessary

        if (errors.length > 0) {
            setStatusMessage({ type: 'error', text: errors.join('. ') });
            return false;
        }

        return true;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setStatusMessage(null);

        try {
            const token = JSON.parse(sessionStorage.getItem('loggedInUser') as string)?.token;
            if (!token) throw new Error(t('AddNutritionLabelForm.errors.missingToken'));

            const response = await ItemService.addNutritionlabelToItem(
                token,
                item.id as number,
                nutritionlabel
            );
            if (response && response.ok) {
                setStatusMessage({ type: 'success', text: t('AddNutritionLabelForm.success') });
                setTimeout(() => router.push('/itemOverview'), 2000);
            } else {
                throw new Error(
                    (response && (await response.json())).message ||
                        t('AddNutritionLabelForm.errors.generic')
                );
            }
        } catch (error: any) {
            setStatusMessage({
                type: 'error',
                text: error.message || t('AddNutritionLabelForm.errors.generic'),
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col p-6 w-full max-w-lg mx-auto mb-8 bg-tertiary shadow-md rounded-lg border-2 border-gray-200"
        >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                {t('AddNutritionLabelForm.title')}
            </h2>
            {statusMessage && (
                <div
                    className={classNames(
                        'mb-4 p-3 rounded-md text-center font-medium',
                        { 'bg-red-100 text-red-700': statusMessage.type === 'error' },
                        { 'bg-green-100 text-green-700': statusMessage.type === 'success' }
                    )}
                >
                    {statusMessage.text}
                </div>
            )}

            <div className="space-y-4">
                {[
                    {
                        name: 'energy',
                        label: t('AddNutritionLabelForm.labels.energy'),
                        value: nutritionlabel.energy,
                    },
                    {
                        name: 'fat',
                        label: t('AddNutritionLabelForm.labels.fat'),
                        value: nutritionlabel.fat,
                    },
                    {
                        name: 'saturatedFats',
                        label: t('AddNutritionLabelForm.labels.saturatedFats'),
                        value: nutritionlabel.saturatedFats,
                    },
                    {
                        name: 'carbohydrates',
                        label: t('AddNutritionLabelForm.labels.carbohydrates'),
                        value: nutritionlabel.carbohydrates,
                    },
                    {
                        name: 'sugar',
                        label: t('AddNutritionLabelForm.labels.sugar'),
                        value: nutritionlabel.sugar,
                    },
                    {
                        name: 'protein',
                        label: t('AddNutritionLabelForm.labels.protein'),
                        value: nutritionlabel.protein,
                    },
                    {
                        name: 'salts',
                        label: t('AddNutritionLabelForm.labels.salts'),
                        value: nutritionlabel.salts,
                    },
                ].map((field) => (
                    <div key={field.name}>
                        <label
                            htmlFor={field.name}
                            className="block text-gray-700 font-medium mb-1"
                        >
                            {field.label}:
                        </label>
                        <input
                            type="number"
                            required
                            name={field.name}
                            min={0}
                            step={1}
                            value={field.value}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                ))}
            </div>

            <button
                type="submit"
                className={classNames(
                    'mt-6 w-full py-3 font-semibold rounded-lg transition duration-300 cursor-pointer',
                    { 'bg-blue-500 text-white hover:bg-blue-600': !isLoading },
                    { 'bg-gray-300 text-gray-500 cursor-not-allowed': isLoading }
                )}
                disabled={isLoading}
            >
                {isLoading
                    ? t('AddNutritionLabelForm.loading')
                    : t('AddNutritionLabelForm.buttons.submit')}
            </button>
        </form>
    );
};

export default AddNutritionLabelForm;

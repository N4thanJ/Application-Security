import { Item } from '@types';
import { useTranslation } from 'next-i18next';
import React from 'react';

type Props = {
    item: Item;
};

const NutritionLabel: React.FC<Props> = ({ item }: Props) => {
    const { t } = useTranslation('common');

    return (
        <>
            {item.nutritionlabel ? (
                <section>
                    <h2 className="text-2xl font-bold mb-4">{t('NutritionLabel.title')}</h2>
                    <ul className="space-y-2 text-gray-700">
                        <li>
                            <span className="font-medium">{'Energy'}:</span>{' '}
                            {item.nutritionlabel.energy} g
                        </li>
                        <li>
                            <span className="font-medium">{'Fats'}:</span> {item.nutritionlabel.fat}{' '}
                            g
                        </li>
                        <li>
                            <span className="font-medium">{'Saturated Fats'}</span>{' '}
                            {item.nutritionlabel.saturatedFats} g
                        </li>
                        <li>
                            <span className="font-medium">{'Carbohydrates'}</span>{' '}
                            {item.nutritionlabel.carbohydrates} g
                        </li>
                        <li>
                            <span className="font-medium">{'Sugar'}:</span>{' '}
                            {item.nutritionlabel.sugar} g
                        </li>
                        <li>
                            <span className="font-medium">{'Protein'}:</span>{' '}
                            {item.nutritionlabel.protein} g
                        </li>
                        <li>
                            <span className="font-medium">{'Salts'}:</span>{' '}
                            {item.nutritionlabel.salts} g
                        </li>
                    </ul>
                </section>
            ) : (
                <h2 className="text-lg font-semibold text-gray-700">
                    {t('NutritionLabel.noLabel', { name: item.name })}
                </h2>
            )}
        </>
    );
};

export default NutritionLabel;

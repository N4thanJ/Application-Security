import { Item } from '@types';
import { useTranslation } from 'next-i18next';

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
                            <span className="font-medium">{t('NutritionLabel.labels.energy')}:</span>{' '}
                            {item.nutritionlabel.energy} g
                        </li>
                        <li>
                            <span className="font-medium">{t('NutritionLabel.labels.fats')}:</span> {item.nutritionlabel.fat} g
                        </li>
                        <li>
                            <span className="font-medium">{t('NutritionLabel.labels.saturatedFats')}:</span>{' '}
                            {item.nutritionlabel.saturatedFats} g
                        </li>
                        <li>
                            <span className="font-medium">{t('NutritionLabel.labels.carbohydrates')}:</span>{' '}
                            {item.nutritionlabel.carbohydrates} g
                        </li>
                        <li>
                            <span className="font-medium">{t('NutritionLabel.labels.sugar')}:</span> {item.nutritionlabel.sugar}{' '}
                            g
                        </li>
                        <li>
                            <span className="font-medium">{t('NutritionLabel.labels.protein')}:</span>{' '}
                            {item.nutritionlabel.protein} g
                        </li>
                        <li>
                            <span className="font-medium">{t('NutritionLabel.labels.salts')}:</span> {item.nutritionlabel.salts}{' '}
                            g
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
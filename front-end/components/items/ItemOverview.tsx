import { Item } from '@types';
import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import NutritionLabel from './NutritionLabel';

type Props = {
    items: Item[] | [];
};

const ItemsOverview: React.FC<Props> = ({ items }: Props) => {
    const { t } = useTranslation('common');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = scrollContainerRef.current.clientWidth;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <>
            <div className="relative">
                {items && items.length > 0 && (
                    <>
                        <div
                            ref={scrollContainerRef}
                            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory no-scrollbar gap-3"
                        >
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => setSelectedItem(item)}
                                    className="flex-shrink-0 snap-start overflow-hidden transform transition-transform duration-300 cursor-pointer flex flex-col"
                                >
                                    <div className="h-48 bg-tertiary rounded-lg">
                                        <img
                                            src={item.pathToImage}
                                            className="w-full h-full object-cover rounded"
                                            alt={t('itemsOverview.itemCard.altText', {
                                                itemName: item.name,
                                            })}
                                        />
                                    </div>

                                    <div className="pt-2">
                                        <h2 className="text-lg font-semibold text-gray-700">
                                            {item.name}
                                        </h2>
                                        <p className="text-sm text-white bg-red-500 inline-block rounded-md py-1 px-1">
                                            € {item.price}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 border border-black hover:bg-opacity-80 transition-all"
                            aria-label={t('itemsOverview.buttons.scrollLeft')}
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-700" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 border border-black hover:bg-opacity-80 transition-all"
                            aria-label={t('itemsOverview.buttons.scrollRight')}
                        >
                            <ChevronRight className="w-6 h-6 text-gray-700" />
                        </button>
                    </>
                )}
            </div>

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
                            aria-label={t('itemsOverview.modal.close')}
                        />
                        <NutritionLabel item={selectedItem} />
                    </div>
                </div>
            )}
        </>
    );
};

export default ItemsOverview;

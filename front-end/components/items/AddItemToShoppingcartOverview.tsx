import { Item, Shoppingcart } from '@types';
import { ChevronDown, Minus, Plus } from 'lucide-react';

type Props = {
    items: Item[];
    shoppingcart: Shoppingcart;
    selectedItem: (item: Item) => void;
    removeAnItemFromShoppingcart: (item: Item, shoppingcart: Shoppingcart) => void;
    addItemToShoppingcart: (item: Item, shoppingcart: Shoppingcart) => void;
};

const AddItemToShoppingcartForm: React.FC<Props> = ({
    items,
    shoppingcart,
    selectedItem,
    removeAnItemFromShoppingcart,
    addItemToShoppingcart,
}: Props) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {items.map((item) => (
                <div
                    key={item.id}
                    onClick={() => selectedItem(item)}
                    className="overflow-hidden transform transition-transform duration-300 cursor-pointer flex flex-col shadow-lg rounded-md bg-tertiary"
                >
                    <div className="h-48 w-full relative bg-gray-100">
                        <img
                            src={item.pathToImage}
                            className="w-full h-full object-cover"
                            alt={`${item.name} image`}
                        />
                    </div>
                    <div className="p-3">
                        <div>
                            {' '}
                            <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                            <p className="text-sm text-gray-500">{item.price} €</p>
                        </div>

                        <div className="flex items-center justify-center space-x-2 mt-4">
                            {(shoppingcart.items.find((cartItem) => cartItem.item.id === item.id)
                                ?.quantity ?? 0) > 0 && (
                                <>
                                    <button
                                        className="bg-blue-500 rounded-full hover:bg-blue-700 transition-all text-white p-1"
                                        onClick={() =>
                                            removeAnItemFromShoppingcart(item, shoppingcart)
                                        }
                                    >
                                        <Minus size={24} />
                                    </button>
                                    <input
                                        type="text"
                                        className="w-28 text-center border border-gray-300 rounded-md"
                                        value={
                                            shoppingcart.items.find(
                                                (cartItem) => cartItem.item.id === item.id
                                            )?.quantity || 0
                                        }
                                        readOnly
                                    />
                                </>
                            )}
                            <button
                                className="bg-blue-500 rounded-full hover:bg-blue-700 transition-all text-white p-1"
                                onClick={() => addItemToShoppingcart(item, shoppingcart)}
                            >
                                <Plus size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AddItemToShoppingcartForm;

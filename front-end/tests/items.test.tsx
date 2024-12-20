import ItemOverview from '@components/items/ItemOverview';
import { render, screen } from '@testing-library/react';
import { Category } from '@types';

const fruits: {
    id: number;
    name: string;
    price: number;
    pathToImage: string;
    category: Category;
}[] = [
    {
        id: 2,
        name: 'Kaki',
        price: 3.99,
        pathToImage:
            'https://www.fruitsnacks.be/media/cache/strip/uploads/media/5d2dc27ab1968/food-1056646-1280.jpg',
        category: 'fruits',
    },
    {
        id: 1,
        name: 'Strawberry',
        price: 4.19,
        pathToImage:
            'https://www.health.com/thmb/zvfL1rCWAPg3XzidfAqURuCmttk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Strawberries-c5f434e7729e47c5b32c0deaa029386c.jpg',
        category: 'fruits',
    },
    {
        id: 3,
        name: 'Banana',
        price: 2.59,
        pathToImage:
            'https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2018/08/bananas-1354785_1920.jpg',
        category: 'fruits',
    },
    {
        id: 8,
        name: 'Coconut',
        price: 6.79,
        pathToImage:
            'https://www.jiomart.com/images/product/original/590000086/big-coconut-1-pc-approx-350-g-600-g-product-images-o590000086-p590000086-0-202408070949.jpg?im=Resize=(420,420)',
        category: 'fruits',
    },
    {
        id: 9,
        name: 'Mango',
        price: 3.79,
        pathToImage:
            'https://www.natural-cure.org/wp-content/uploads/diet-and-nutrition-Mango-The-King-of-Fruit-has-Incredible-Health-Benefits.jpg',
        category: 'fruits',
    },
    {
        id: 4,
        name: 'Kiwi',
        price: 1.39,
        pathToImage:
            'https://www.health.com/thmb/YjD1m861zN2cGF4q9bbeu6now64=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Kiwi-a2e9888bfab6474f8d12d2ae0287b356.jpg',
        category: 'fruits',
    },
    {
        id: 6,
        name: 'Plum',
        price: 1.29,
        pathToImage:
            'https://assets.idahopreferred.com/uploads/2023/09/07170427/Plums-scaled-1.jpg',
        category: 'fruits',
    },
    {
        id: 10,
        name: 'Papaya',
        price: 4.29,
        pathToImage:
            'https://media.post.rvohealth.io/wp-content/uploads/2020/09/papaya-benefits-732x549-thumbnail.jpg',
        category: 'fruits',
    },
    {
        id: 11,
        name: 'Passion Fruit',
        price: 5.49,
        pathToImage:
            'https://www.health.com/thmb/VAp6rYEuFSjs-pr32reGxu_nflo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1304948489-2ce87241ca6943e4a3d617f74aa7aaa8.jpg',
        category: 'fruits',
    },
    {
        id: 5,
        name: 'Blueberries',
        price: 3.49,
        pathToImage:
            'https://images.squarespace-cdn.com/content/v1/58ebe6632994ca71ba304549/1491938746710-RE9ICCSBHSDYRFNJU5WG/image-asset.jpeg',
        category: 'fruits',
    },
    {
        id: 7,
        name: 'Dragonfruit',
        price: 4.99,
        pathToImage:
            'https://gardenerspath.com/wp-content/uploads/2022/09/Best-Dragon-Fruit-Varieties-FB.jpg',
        category: 'fruits',
    },
];

test('given fruits - when you want to see all fruits in a overview table - then all fruits are displayed', async () => {
    render(<ItemOverview items={fruits} />);

    for (const fruit of fruits) {
        expect(screen.getByText(fruit.name));
    }
});

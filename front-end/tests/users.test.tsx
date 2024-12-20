import React from 'react';
import { render, screen } from '@testing-library/react';
import UserAdminOverview from '@components/users/UserAdminOverview';
import { Category, Role } from '@types';
import UserEditForm from '@components/users/UserEditForm';

const users: {
    id: number;
    email: string;
    password: string;
    role: Role;
    shoppingcarts: {
        items: {
            item: {
                id: number;
                name: string;
                price: number;
                pathToImage: string;
                category: Category;
            };
            quantity: number;
        }[];
        id: number;
        name: string;
        deliveryDate: Date;
    }[];
}[] = [
    {
        id: 2,
        email: 'josh.doe@mail.com',
        password: '$2b$12$l9eZIZ0kLq.NSHEC0jHKoOvzuShuFxdnMPt6WZLZ28ZuNFbuPApza',
        role: 'manager',
        shoppingcarts: [],
    },
    {
        id: 1,
        email: 'jane.doe@mail.com',
        password: '$2b$12$xJL5OS4l.K.nisSzVOIKI.9eno/Cu8vKRvJmGSNrdioaLpTc1wd2O',
        role: 'admin',
        shoppingcarts: [
            {
                items: [
                    {
                        item: {
                            id: 1,
                            name: 'Strawberry',
                            price: 4.19,
                            pathToImage:
                                'https://www.health.com/thmb/zvfL1rCWAPg3XzidfAqURuCmttk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Strawberries-c5f434e7729e47c5b32c0deaa029386c.jpg',
                            category: 'fruits',
                        },
                        quantity: 1,
                    },
                ],
                id: 1,
                name: 'Shoppingcart 2',
                deliveryDate: new Date('2026-09-16T00:00:00.000Z'),
            },
        ],
    },
    {
        id: 0,
        email: 'john.doe@mail.com',
        password: '$2b$12$Uaf5.2/yLqrh3V5lQojZEOC.JjSgz1SjJyqHXohxCcncLAZjB0dh6',
        role: 'user',
        shoppingcarts: [
            {
                items: [
                    {
                        item: {
                            id: 1,
                            name: 'Strawberry',
                            price: 4.19,
                            pathToImage:
                                'https://www.health.com/thmb/zvfL1rCWAPg3XzidfAqURuCmttk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Strawberries-c5f434e7729e47c5b32c0deaa029386c.jpg',
                            category: 'fruits',
                        },
                        quantity: 1,
                    },
                ],
                id: 0,
                name: 'Shoppingcart 1',
                deliveryDate: new Date('2026-12-24T00:00:00.000Z'),
            },
        ],
    },
];

test('given users - when you want to see all users in a overview table - then all users are displayed', async () => {
    const handleDeleteUser = async (id: number): Promise<void> => {
        return Promise.resolve();
    };

    render(<UserAdminOverview users={users} handleDeleteUser={handleDeleteUser} />);

    for (const user of users) {
        expect(screen.getByText(user.email));
        expect(screen.getByText(user.role));
    }
});

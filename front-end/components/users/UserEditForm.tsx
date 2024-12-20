import { useState, ChangeEvent, useEffect } from 'react';
import UserService from '@services/userService';
import { useRouter } from 'next/router';
import { Role, User } from '@types';
import { useTranslation } from 'next-i18next';
import React from 'react';

interface UpdateUserFormProps {
    initialUser: User;
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({ initialUser }) => {
    const router = useRouter();
    const { t } = useTranslation();
    const [user, setUser] = useState({
        id: initialUser.id,
        email: initialUser.email,
        password: '',
        role: initialUser.role,
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: name === 'role' ? (value as Role) : value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (user.id !== undefined) {
                const token = JSON.parse(sessionStorage.getItem('loggedInUser') as string).token;
                await UserService.updateUser(token, user.id, {
                    email: user.email,
                    password: user.password,
                    role: user.role,
                }); // Pass user id and updated data
            } else {
                console.error('User ID is undefined');
            }
            router.push('/adminUsersOverview'); // Redirect to admin overview page
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <section>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col p-6 w-full max-w-lg mx-auto mb-8 bg-tertiary shadow-md rounded-lg border-2 border-gray-200"
            >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                    {t('UpdateUserForm.title')}
                </h2>
                <div className="space-y-2">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                            {t('UpdateUserForm.emailLabel')}
                        </label>
                        <input
                            type="email"
                            required
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                            {t('UpdateUserForm.passwordLabel')}
                        </label>
                        <input
                            type="password"
                            required
                            name="password"
                            value={user.password}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-gray-700 font-medium mb-1">
                            {t('UpdateUserForm.roleLabel')}
                        </label>
                        <select
                            name="role"
                            value={user.role}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                        >
                            <option className="text-sm" value="user">
                                {t('UpdateUserForm.roleUser')}
                            </option>
                            <option className="text-sm" value="admin">
                                {t('UpdateUserForm.roleAdmin')}
                            </option>
                        </select>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="mt-6 w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
                        >
                            {t('UpdateUserForm.updateButton')}
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default UpdateUserForm;

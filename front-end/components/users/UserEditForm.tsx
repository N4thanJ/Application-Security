import { useState, ChangeEvent, useEffect } from 'react';
import UserService from '@services/userService';
import { useRouter } from 'next/router';
import { Role, User } from '@types';
import { useTranslation } from 'next-i18next';

interface UpdateUserFormProps {
    initialUser: User;
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({ initialUser }) => {
    const router = useRouter();
    const { t } = useTranslation();

    const [user, setUser] = useState<User>({
        id: initialUser.id,
        email: initialUser.email,
        password: '',
        role: initialUser.role,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState<{
        type: 'success' | 'error';
        text: string;
    } | null>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: name === 'role' ? (value as Role) : value,
        }));
    };

    const validateForm = () => {
        if (!user.email) {
            setStatusMessage({ type: 'error', text: t('UpdateUserForm.errors.missingEmail') });
            return false;
        }
        if (user.password && user.password.length < 6) {
            setStatusMessage({ type: 'error', text: t('UpdateUserForm.errors.shortPassword') });
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
            if (!token) throw new Error(t('UpdateUserForm.errors.missingToken'));

            const response = await UserService.updateUser(token, user.id!, {
                email: user.email,
                password: user.password,
                role: user.role,
            });

            if (response.ok) {
                setStatusMessage({ type: 'success', text: t('UpdateUserForm.successMessage') });
                setTimeout(() => router.push('/adminUsersOverview'), 1500);
            } else {
                const errorMsg =
                    (await response.json()).message || t('UpdateUserForm.errors.generic');
                throw new Error(errorMsg);
            }
        } catch (error: any) {
            setStatusMessage({
                type: 'error',
                text: error.message || t('UpdateUserForm.errors.generic'),
            });
        } finally {
            setIsSubmitting(false);
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

                {statusMessage && (
                    <div
                        className={`p-3 rounded-md font-medium mb-4 text-center ${
                            statusMessage.type === 'success'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                        }`}
                    >
                        {statusMessage.text}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium">
                            {t('UpdateUserForm.emailLabel')}
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium">
                            {t('UpdateUserForm.passwordLabel')}
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleInputChange}
                            required
                            placeholder={t('UpdateUserForm.passwordPlaceholder')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-gray-700 font-medium">
                            {t('UpdateUserForm.roleLabel')}
                        </label>
                        <select
                            name="role"
                            value={user.role}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                        >
                            <option value="user">{t('UpdateUserForm.roleUser')}</option>
                            <option value="admin">{t('UpdateUserForm.roleAdmin')}</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 text-white font-medium rounded-lg ${
                            isSubmitting
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600'
                        } transition duration-300`}
                    >
                        {isSubmitting
                            ? t('UpdateUserForm.loading')
                            : t('UpdateUserForm.updateButton')}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default UpdateUserForm;

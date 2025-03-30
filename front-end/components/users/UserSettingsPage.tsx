import UserService from '@services/userService';
import { StatusMessage, User } from '@types';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SettingsFormProps {
    setLoggedInUser: (user: User | null) => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ setLoggedInUser }) => {
    const [oldPassword, setOldPassword] = useState<string>('');
    const [oldPasswordError, setOldPasswordError] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [newPasswordError, setNewPasswordError] = useState<string>('');
    const router = useRouter();
    const { t } = useTranslation();

    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const logOut = () => {
        sessionStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
        router.push('/login');
    };

    const clearErrors = () => {
        setOldPasswordError('');
        setNewPasswordError('');
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let isValid = true;
        clearErrors();

        if (!newPassword.trim()) {
            setNewPasswordError('Please enter a valid password.');
            isValid = false;
        }
        if (!oldPassword.trim()) {
            setOldPasswordError('Please enter a valid password.');
            isValid = false;
        }

        return isValid;
    };

    const changePassword = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!validate()) return;

        if (!oldPassword || !newPassword) {
            console.error('Both password fields must be filled out');
            return;
        }

        try {
            const token = JSON.parse(sessionStorage.getItem('loggedInUser') as string).token;
            const response = await UserService.updateUsersPassword(
                token,
                oldPassword as string,
                newPassword as string
            );

            if (response) {
                setStatusMessages([
                    {
                        message: 'Password updated successfully, redirecting to login page...',
                        type: 'success',
                    },
                ]);

                setTimeout(() => {
                    logOut();
                }, 2000);
            }
        } catch (error) {
            console.error(error);
            setStatusMessages([
                {
                    message: t('UserLoginForm.unexpectedError'),
                    type: 'error',
                },
            ]);
        }
    };

    return (
        <>
            <form onSubmit={changePassword}>
                <div className="py-4">
                    <label htmlFor="oldPassword" className="block mb-2">
                        Old Password
                    </label>
                    <input
                        type="password"
                        name="oldPassword"
                        id="oldPassword"
                        placeholder="Enter your old password"
                        className="border border-gray-300 p-2 w-full mb-4"
                        value={oldPassword || ''}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    {oldPasswordError && (
                        <span className="text-red-700 font-bold text-sm">{oldPasswordError}</span>
                    )}
                    <label htmlFor="newPassword" className="block mb-2">
                        New Password
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        placeholder="Enter your new password"
                        className="border border-gray-300 p-2 w-full mb-2"
                        value={newPassword || ''}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {newPasswordError && (
                        <span className="text-red-700 font-bold text-sm">{newPasswordError}</span>
                    )}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white block mt-4 py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
            {statusMessages && (
                <div>
                    <ul>
                        {statusMessages.map(({ message, type }, index) => (
                            <li
                                key={index}
                                className={classNames({
                                    'text-red-800': type === 'error',
                                    'text-green-800': type === 'success',
                                })}
                            >
                                {message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default SettingsForm;

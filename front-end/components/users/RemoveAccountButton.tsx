import UserService from '@services/userService';
import { StatusMessage, User } from '@types';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface RemoveAccountButtonProps {
    setLoggedInUser: (user: User | null) => void;
}

const RemoveAccountButton: React.FC<RemoveAccountButtonProps> = ({ setLoggedInUser }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const router = useRouter();
    const { t } = useTranslation();

    const logOut = () => {
        sessionStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
        router.push('/login');
    };

    const handleDeleteAccount = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const token = JSON.parse(sessionStorage.getItem('loggedInUser') as string).token;
            const email = JSON.parse(sessionStorage.getItem('loggedInUser') as string).email;
            const response = await UserService.deleteUserByMail(token, email);

            if (response && response.ok) {
                setStatusMessages([
                    {
                        message: 'Removed Account successfully, redirecting!',
                        type: 'success',
                    },
                ]);

                setTimeout(() => {
                    logOut();
                }, 1200);
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
        setShowConfirmation(false);
    };

    return (
        <>
            <div>
                <h3 className="text-lg mt-4">Delete your account</h3>
                <button
                    className="bg-red-500 text-white block mt-4 py-2 px-4 rounded hover:bg-red-600"
                    type="button"
                    onClick={() => setShowConfirmation(true)}
                >
                    Delete account
                </button>

                <div
                    className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-200 ${
                        showConfirmation ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                >
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h4 className="text-lg mb-4">Are you sure?</h4>
                        <button
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mr-2"
                            onClick={handleDeleteAccount}
                        >
                            Yes, delete my account
                        </button>
                        <button
                            className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400"
                            onClick={() => setShowConfirmation(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
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

export default RemoveAccountButton;

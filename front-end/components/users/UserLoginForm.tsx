import userService from '@services/userService';
import { StatusMessage } from '@types';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const UserLoginForm: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const clearErrors = () => {
        setNameError(null);
        setPasswordError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let result = true;

        if (!email && email.trim() === '') {
            setNameError('Email is required');
            result = false;
        }

        if (!password && password.trim() === '') {
            setPasswordError('Password is required');
            result = false;
        }

        return result;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();
        if (!validate()) {
            return;
        }

        try {
            const response = await userService.login(email, password);
            const loggedInUser = await response.json();

            setStatusMessages([
                {
                    message: 'Login successful. Redirecting to homepage...',
                    type: 'success',
                },
            ]);

            sessionStorage.setItem(
                'loggedInUser',
                JSON.stringify({
                    token: loggedInUser.token,
                    email: loggedInUser.email,
                    role: loggedInUser.role,
                })
            );

            setTimeout(() => {
                router.push('/');
            }, 2000);
        } catch (error) {
            setStatusMessages([
                {
                    message: 'Combination of email and password is incorrect. Please try again.',
                    type: 'error',
                },
            ]);
        }
    };

    return (
        <>
            <h3>Login</h3>

            <form onSubmit={handleSubmit} className="w-1/3">
                <div>
                    <label htmlFor="emailInput">Email:</label>
                    <input
                        id="emailInput"
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter your email..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {nameError && <span className="text-red-700 font-bold">{nameError}</span>}
                </div>

                <div className="mt-4">
                    <label htmlFor="passwordInput">Password:</label>
                    <input
                        id="passwordInput"
                        type="text"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter your password..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {passwordError && (
                        <span className="text-red-700 font-bold">{passwordError}</span>
                    )}
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

                <button
                    className="mt-6 w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
                    type="submit"
                >
                    Login
                </button>
            </form>

            <Link
                href="/register"
                className="mt-6 w-1/3 py-3 text-center bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-400 transition duration-300 cursor-pointer"
            >
                Register
            </Link>
        </>
    );
};

export default UserLoginForm;

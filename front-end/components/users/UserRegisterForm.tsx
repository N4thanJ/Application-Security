import userService from '@services/userService';
import { StatusMessage } from '@types';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const UserRegisterForm: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const clearErrors = () => {
        setEmailError(null);
        setPasswordError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let isValid = true;
        clearErrors();

        if (!email.trim()) {
            setEmailError('Email is required');
            isValid = false;
        }
        if (!password.trim()) {
            setPasswordError('Password is required');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!validate()) return;

        try {
            const response = await userService.register(email, password);

            if (response.ok) {
                setStatusMessages([
                    {
                        message: 'Registration successful. Redirecting to login...',
                        type: 'success',
                    },
                ]);

                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } else {
                const errorResponse = await response.json();
                setStatusMessages([
                    {
                        message: errorResponse?.message || 'Registration failed. Please try again.',
                        type: 'error',
                    },
                ]);
            }
        } catch (error) {
            setStatusMessages([
                {
                    message: 'An unexpected error occurred. Please try again later.',
                    type: 'error',
                },
            ]);
        }
    };

    return (
        <>
            <h3>Register</h3>

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
                    {emailError && <span className="text-red-700 font-bold">{emailError}</span>}
                </div>

                <div className="mt-4">
                    <label htmlFor="passwordInput">Password:</label>
                    <input
                        id="passwordInput"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter a password..."
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
                    Register
                </button>
            </form>

            <Link
                href="/login"
                className="mt-6 w-1/3 py-3 text-center bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-400 transition duration-300 cursor-pointer"
            >
                Already have an account?
            </Link>
        </>
    );
};

export default UserRegisterForm;

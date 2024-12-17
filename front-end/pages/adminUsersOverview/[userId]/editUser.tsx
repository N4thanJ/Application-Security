import { User } from '@types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import UserService from '@services/userService';
import UserEditForm from '@components/users/UserEditForm';
import Head from 'next/head';

const EditUserPage: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const params = useParams<{ userId?: string }>();
    const userId = params?.userId;
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (!userId) return;

        const fetchUser = async () => {
            try {
                const response = await UserService.getUserById(String(userId));
                const fetchedUser = await response.json();
                setUser(fetchedUser);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        const token = JSON.parse(sessionStorage.getItem('loggedInUser') || 'null');
        setLoggedInUser(token);

        fetchUser();
    }, [userId]);

    if (!loggedInUser || loggedInUser.role !== 'admin') {
        return (
            <p className="pt-4 text-lg text-red-600 text-center italic font-bold">
                Unauthorized to access this page!
            </p>
        );
    }

    return (
        <>
            <Head>
                <title>Edit User</title>
            </Head>
            <section>
                {user ? (
                    <UserEditForm initialUser={user} />
                ) : (
                    <p className="text-center text-gray-600">Loading user information...</p>
                )}
            </section>
        </>
    );
};

export default EditUserPage;

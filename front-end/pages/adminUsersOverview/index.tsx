import { Plus } from 'lucide-react';
import Link from 'next/link';
import UserAdminOverview from '@components/users/UserAdminOverview';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { User } from '@types';
import UserService from '@services/userService';

const AdminUserPage: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);

    const handleDeleteUser = async (id: number | undefined): Promise<void> => {
        try {
            const token = JSON.parse(sessionStorage.getItem('loggedInUser') as string).token;
            id && (await UserService.deleteUser(token, id));
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = JSON.parse(sessionStorage.getItem('loggedInUser') as string).token;
                const response = await UserService.getAllUsers(token);
                const fetchedUsers: User[] = await response.json();
                setUsers(fetchedUsers);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
        const token = JSON.parse(sessionStorage.getItem('loggedInUser') || 'null');
        setLoggedInUser(token);
    }, []);

    if (!loggedInUser || loggedInUser.role !== 'admin') {
        return (
            <p className="py-56 text-lg text-red-600 text-center italic font-bold">
                Please log in to view this page.
            </p>
        );
    }

    return (
        <>
            <Head>
                <title>Admin User Overview</title>
            </Head>
            <div className="flex items-center gap-4 mb-4">
                <h1>Admin User Overview Page</h1>
                <Link
                    href={`adminUsersOverview/addUser`}
                    className="p-1 bg-green-400 rounded-lg text-white hover:bg-green-600 transition-all"
                >
                    <Plus size={24} />
                </Link>
            </div>

            <section>
                <UserAdminOverview users={users} handleDeleteUser={handleDeleteUser} />
            </section>
        </>
    );
};

export default AdminUserPage;

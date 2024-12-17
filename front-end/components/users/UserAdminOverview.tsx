import { User } from '@types';
import { EllipsisVertical } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import UserService from '@services/userService';

const UserAdminOverview: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [menuOpenId, setMenuOpenId] = useState<number | undefined>(undefined);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await UserService.getAllUsers();
                const fetchedUsers: User[] = await response.json();
                setUsers(fetchedUsers);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, []);

    const toggleMenu = (userId: number | undefined) => {
        setMenuOpenId(menuOpenId === userId ? undefined : userId);
    };

    async function handleDeleteUser(id: number | undefined): Promise<void> {
        try {
            id && (await UserService.deleteUser(id));
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {users && (
                <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-lg">
                    <table className="min-w-full bg-white text-left rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-center">
                                {/* <th className="px-6 py-4 font-semibold text-sm">Name</th> */}
                                <th className="px-6 py-4 font-semibold text-sm">Email</th>
                                <th className="px-6 py-4 font-semibold text-sm">Role</th>
                                <th className="px-6 py-4 font-semibold text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className={`${user.id && user.id % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                        } hover:bg-gray-100 transition-colors duration-200 text-center`}
                                >
                                    {/* <td className="px-6 py-4 border-t border-gray-200 text-sm text-gray-800">
                                        {user.name}
                                    </td> */}
                                    <td className="px-6 py-4 border-t border-gray-200 text-sm text-gray-800">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 border-t border-gray-200 text-sm text-gray-800">
                                        {user.role}
                                    </td>
                                    <td className="px-6 py-4 border-t border-gray-200 relative">
                                        <button
                                            onClick={() => toggleMenu(user.id)}
                                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                        >
                                            <EllipsisVertical size={24} />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {menuOpenId === user.id && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 transition-opacity duration-200 ease-out opacity-100">
                                                <Link
                                                    href={`/adminUsersOverview/${user.id}/editUser`}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-700 hover:text-white hover:rounded-t-lg transition-all duration-200"
                                                >
                                                    Edit User
                                                </Link>
                                                <a
                                                    className="block rounded-b-lg px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-200 cursor-pointer"
                                                    onClick={() => handleDeleteUser(user.id)}
                                                >
                                                    Delete User
                                                </a>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default UserAdminOverview;

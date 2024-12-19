import { User } from '@types';
import { EllipsisVertical } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next'; // Assuming you're using next-i18next for translations

type Props = {
    users: User[];
    handleDeleteUser: (id: number) => Promise<void>;
};

const UserAdminOverview: React.FC<Props> = ({ users, handleDeleteUser }: Props) => {
    const [menuOpenId, setMenuOpenId] = useState<number | undefined>(undefined);
    const { t } = useTranslation(); // Initialize translation function

    const toggleMenu = (userId: number | undefined) => {
        setMenuOpenId(menuOpenId === userId ? undefined : userId);
    };

    return (
        <>
            {users && (
                <div className="border border-gray-300 shadow-lg">
                    <table className="min-w-full bg-white text-left">
                        <thead className="rounded-t-lg">
                            <tr className="bg-gray-100 text-gray-700 text-center">
                                <th className="px-6 py-4 font-semibold text-sm">{t('UserAdminOverview.email')}</th>
                                <th className="px-6 py-4 font-semibold text-sm">{t('UserAdminOverview.role')}</th>
                                <th className="px-6 py-4 font-semibold text-sm">{t('UserAdminOverview.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className={`${user.id && user.id % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                        } hover:bg-gray-100 transition-colors duration-200 text-center`}
                                >
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
                                                    className="block px-4 py-2 text-sm text-gray-700 rounded-t-lg hover:bg-blue-700 hover:text-white transition-all duration-200"
                                                >
                                                    {t('UserAdminOverview.editUser')}
                                                </Link>

                                                {user?.role !== 'admin' && (
                                                    <a
                                                        className="block rounded-b-lg px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-200 cursor-pointer"
                                                        onClick={() =>
                                                            handleDeleteUser(Number(user.id))
                                                        }
                                                    >
                                                        {t('UserAdminOverview.deleteUser')}
                                                    </a>
                                                )}
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

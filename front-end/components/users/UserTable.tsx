import { useTranslation } from 'next-i18next'; // Assuming you're using next-i18next for translations

const UserTable: React.FC = () => {
    const { t } = useTranslation(); // Initialize translation function

    return (
        <table className="table-auto w-full">
            <thead>
                <tr className="bg-gray-200">
                    <th className="border border-black">{t('UserTable.emailHeader')}</th>
                    <th className="border border-black">{t('UserTable.passwordHeader')}</th>
                    <th className="border border-black">{t('UserTable.roleHeader')}</th>
                </tr>
            </thead>
            <tbody className="text-center">
                <tr>
                    <td className="border border-black">john.doe@mail.com</td>
                    <td className="border border-black">John123!</td>
                    <td className="border border-black">User</td>
                </tr>
                <tr>
                    <td className="border border-black">jane.doe@mail.com</td>
                    <td className="border border-black">Jane123!</td>
                    <td className="border border-black">Admin</td>
                </tr>
            </tbody>
        </table>
    );
};

export default UserTable;

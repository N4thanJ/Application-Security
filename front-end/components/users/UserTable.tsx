const UserTable: React.FC = () => {
    return (
        <table className="table-auto w-full">
            <thead>
                <tr className="bg-gray-200">
                    <th className="border border-black">Email</th>
                    <th className="border border-black">Password</th>
                    <th className="border border-black">Role</th>
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
                    <td className="border border-black">John123!</td>
                    <td className="border border-black">Admin</td>
                </tr>
            </tbody>
        </table>
    );
};

export default UserTable;

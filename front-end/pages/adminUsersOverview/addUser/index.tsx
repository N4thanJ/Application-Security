import CreateUserForm from '@components/users/CreateUserForm';

const AddUser: React.FC = () => {
    return (
        <section className="flex flex-col items-center py-16">
            <CreateUserForm />
        </section>
    );
};

export default AddUser;

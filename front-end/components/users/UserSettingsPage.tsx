import { User } from '@types';
import ChangePasswordForm from './ChangePasswordForm';
import RemoveAccountButton from './RemoveAccountButton';

interface SettingsFormProps {
    setLoggedInUser: (user: User | null) => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ setLoggedInUser }) => {
    return (
        <>
            <ChangePasswordForm setLoggedInUser={setLoggedInUser} />
            <RemoveAccountButton setLoggedInUser={setLoggedInUser} />
        </>
    );
};

export default SettingsForm;

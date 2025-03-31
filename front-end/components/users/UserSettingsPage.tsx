import { User } from '@types';
import ChangePasswordForm from './ChangePasswordForm';

interface SettingsFormProps {
    setLoggedInUser: (user: User | null) => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ setLoggedInUser }) => {
    return (
        <>
            <ChangePasswordForm setLoggedInUser={setLoggedInUser} />
        </>
    );
};

export default SettingsForm;

import SettingsForm from '@components/users/UserSettingsPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { UserContext } from 'pages/_app';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SettingPage: React.FC = () => {
    const { t } = useTranslation();
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);

    useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem('loggedInUser') || 'null');
        setLoggedInUser(token);
    }, []);

    if (!loggedInUser) {
        return (
            <p className="py-56 text-lg text-red-600 text-center italic font-bold">
                {t('loginwarning')}
            </p>
        );
    }

    return (
        <>
            <h3>Settings</h3>
            {loggedInUser && <SettingsForm setLoggedInUser={setLoggedInUser} />}
        </>
    );
};

export const getServerSideProps = async (context: any) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

export default SettingPage;

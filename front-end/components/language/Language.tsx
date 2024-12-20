import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';

const Language: React.FC = () => {
    const router = useRouter();
    const { locale, pathname, asPath, query } = router;
    const { t } = useTranslation('common');

    const handleLanguageChange = (event: { target: { value: string } }) => {
        const newLocale = event.target.value;
        const { pathname, asPath, query } = router;
        router.push({ pathname, query }, asPath, { locale: newLocale });
    };

    return (
        <div className="ml-6">
            <label htmlFor="language" className="text-white sr-only">
                {t('Language.label')}
            </label>
            <select
                id="language"
                className="ml-2 p-1 text-[#02367b]"
                value={locale}
                onChange={handleLanguageChange}
            >
                <option value="en">{t('Language.options.english')}</option>
                <option value="fr">{t('Language.options.french')}</option>
            </select>
        </div>
    );
};

export default Language;

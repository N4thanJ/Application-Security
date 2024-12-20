import Link from 'next/link';
import { useTranslation } from 'next-i18next'; // Assuming you're using next-i18next for translations
import React from 'react';

const Footer: React.FC = () => {
    const { t } = useTranslation(); // Initialize translation function

    return (
        <footer className="bg-primary text-white py-8 w-full">
            <div className="max-w-5xl px-8 mx-auto flex justify-between items-center w-full">
                <p className="text-sm">&copy; {new Date().getFullYear()} Shoppingcart app</p>
                <nav className="">
                    <ul className="flex gap-6">
                        <li>
                            <Link href="/">{t('Footer.home')}</Link>
                        </li>
                        <li>
                            <Link href="/shoppingcarts">{t('Footer.shoppingcarts')}</Link>
                        </li>
                        <li>
                            <Link href="/itemOverview">{t('Footer.adminOverview')}</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;

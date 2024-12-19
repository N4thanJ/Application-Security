import Layout from '@components/Layout';
import '@styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Lexend } from 'next/font/google';

const lexend = Lexend({ subsets: ['latin'] });

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <Layout className={lexend.className}>
            <Component {...pageProps} />
        </Layout>
    );
}


export default appWithTranslation(App);
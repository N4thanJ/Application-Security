import { ArrowLeft } from 'lucide-react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useInterval from 'use-interval';
import React from 'react';

const PrivacyPolicy: React.FC = () => {
    const { t } = useTranslation('common');
    const [accepted, setAccepted] = useState(false);

    const removeDecision = () => {
        sessionStorage.removeItem('cookiePolicyAccepted');
        setAccepted(false);
    };

    useInterval(() => {
        const decision = sessionStorage.getItem('cookiePolicyAccepted');

        if (decision === 'true') {
            setAccepted(true);
        }

        if (decision === null) {
            setAccepted(false);
        }
    }, 100);

    return (
        <>
            <Head>
                <title>{t('PrivacyPolicy.title')}</title>
            </Head>

            <section className="border rounded-lg shadow-lg p-8 mb-8 grid gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        href={'/'}
                        className="bg-red-500 px-4 py-2 rounded text-sm text-white hover:bg-red-600"
                    >
                        <ArrowLeft />
                    </Link>

                    <h1>
                        {t('PrivacyPolicy.title')} (
                        {accepted ? (
                            <small className="font-normal text-green-500">
                                {t('PrivacyPolicy.accepted')}
                            </small>
                        ) : (
                            <small className="font-normal text-red-500">
                                {t('PrivacyPolicy.rejected')}
                            </small>
                        )}
                        )
                    </h1>
                </div>

                <p
                    dangerouslySetInnerHTML={{
                        __html: t('PrivacyPolicy.intro'),
                    }}
                />
                <p>{t('PrivacyPolicy.overview')}</p>

                <h2>{t('PrivacyPolicy.informationWeCollect')}</h2>
                <p>{t('PrivacyPolicy.collectDetails')}</p>
                <ul className="list-disc pl-8">
                    {Array.isArray(t('PrivacyPolicy.collectPoints', { returnObjects: true })) ? (
                        (t('PrivacyPolicy.collectPoints', { returnObjects: true }) as string[]).map(
                            (point: string, index: number) => (
                                <li key={index}>{point}</li>
                            )
                        )
                    ) : null}
                </ul>
                <p>{t('PrivacyPolicy.consentNotice')}</p>

                <h2>{t('PrivacyPolicy.howWeUse')}</h2>
                <p>{t('PrivacyPolicy.useDetails')}</p>
                <ul className="list-disc pl-8">
                    {Array.isArray(t('PrivacyPolicy.usePoints', { returnObjects: true })) &&
                        (t('PrivacyPolicy.usePoints', { returnObjects: true }) as string[]).map(
                            (point: string, index: number) => (
                                <li key={index}>{point}</li>
                            )
                        )}
                </ul>
                <p>{t('PrivacyPolicy.storageNotice')}</p>

                <h2>{t('PrivacyPolicy.thirdPartyServices')}</h2>
                <p>{t('PrivacyPolicy.thirdPartyNotice')}</p>
                <p>{t('PrivacyPolicy.externalLinks')}</p>

                <h2>{t('PrivacyPolicy.yourRights')}</h2>
                <p>{t('PrivacyPolicy.rightsDetails')}</p>
                <p
                    dangerouslySetInnerHTML={{
                        __html: t('PrivacyPolicy.rightsActions'),
                    }}
                />
                <p
                    dangerouslySetInnerHTML={{
                        __html: t('PrivacyPolicy.revokeConsent'),
                    }}
                />

                <h2>{t('PrivacyPolicy.policyUpdates')}</h2>
                <p>{t('PrivacyPolicy.updateNotice')}</p>
                <p
                    dangerouslySetInnerHTML={{
                        __html: t('PrivacyPolicy.agreementNotice'),
                    }}
                />
            </section>
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

export default PrivacyPolicy;

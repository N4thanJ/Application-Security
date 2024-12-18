import { ArrowLeft } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useInterval from 'use-interval';

const PrivacyPolicy: React.FC = () => {
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
                <title>Privacy Policy</title>
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
                        Privacy Policy (
                        {accepted ? (
                            <small className="font-normal text-green-500"> Accepted </small>
                        ) : (
                            <small className="font-normal text-red-500"> Rejected </small>
                        )}
                        )
                    </h1>
                </div>

                <p>
                    Your privacy is important to us. It is Shop & Go's policy to respect your
                    privacy regarding any information we may collect from you across our website,
                    <Link href="/">http://www.shopandgo.com</Link>, and other platforms we operate.
                </p>
                <p>
                    Shop & Go is designed to make your supermarket visits more convenient. To
                    achieve this, we may collect and use certain personal information. This Privacy
                    Policy outlines how we handle, store, and protect that data.
                </p>
                <h2>Information We Collect</h2>
                <p>
                    We only request personal information when it is necessary to provide a specific
                    service to you, such as:
                </p>
                <ul className="list-disc pl-8">
                    <li>
                        Your name, email address, or other contact details for account creation.
                    </li>
                    <li>
                        Your shopping preferences, lists, and location data to suggest the best
                        routes and stores near you.
                    </li>
                    <li>Feedback, queries, or communication to improve our services.</li>
                </ul>
                <p>
                    All data collection is performed with your consent, and you will be informed
                    about why the information is needed and how it will be used.
                </p>
                <h2>How We Use Your Information</h2>
                <p>The personal data we collect is used to:</p>
                <ul className="list-disc pl-8">
                    <li>Enhance your planning experience by customizing recommendations.</li>
                    <li>
                        Optimize your supermarket visits based on your preferences and location.
                    </li>
                    <li>Communicate important updates or respond to your queries.</li>
                </ul>
                <p>
                    We only retain your information for as long as necessary to provide these
                    services. Stored data is safeguarded using industry-standard practices to
                    prevent unauthorized access, theft, or misuse.
                </p>
                <h2>Third-Party Services</h2>
                <p>
                    We do not share your personal data with third parties unless it is required by
                    law or necessary to provide the services you request. For instance, location
                    data may be used with mapping services to identify the nearest supermarkets.
                </p>
                <p>
                    Our website may contain links to external sites not operated by Shop & Go.
                    Please be aware that we are not responsible for the content, practices, or
                    privacy policies of these external sites.
                </p>
                <h2>Your Rights</h2>
                <p>
                    You have the right to refuse our request for your personal information, with the
                    understanding that this may limit some functionalities of Shop & Go. For
                    example, personalized supermarket suggestions may not be available.
                </p>
                <p>
                    You may also request to view, update, or delete the personal data we have
                    collected about you. Please contact us at{' '}
                    <a href="mailto:privacy@shopandgo.com">privacy@shopandgo.com</a> for assistance
                    with any privacy-related concerns.
                </p>
                <p>
                    At any point you can choose to{' '}
                    <span
                        onClick={() => {
                            removeDecision(), !setAccepted;
                        }}
                        className="text-red-500 cursor-pointer"
                    >
                        revoke
                    </span>{' '}
                    your consent for data collection and use.
                </p>
                <h2>Updates to This Policy</h2>
                <p>
                    This Privacy Policy is effective as of 18/12/2024. We may update it from time to
                    time to reflect changes in our practices or relevant laws. Any updates will be
                    communicated through our website.
                </p>
                <p>
                    By continuing to use Shop & Go, you agree to our Privacy Policy. If you have any
                    questions or concerns, feel free to reach out to us at{' '}
                    <a href="mailto:support@shopandgo.com">support@shopandgo.com</a>.
                </p>
            </section>
        </>
    );
};

export default PrivacyPolicy;

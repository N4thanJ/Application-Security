import { useState, useEffect } from 'react';

const CookiePolicy: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if the user has already made a decision
        const cookieDecision = sessionStorage.getItem('cookiePolicyAccepted');
        if (!cookieDecision) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        sessionStorage.setItem('cookiePolicyAccepted', 'true');
        setIsVisible(false);
    };

    const handleDecline = () => {
        sessionStorage.setItem('cookiePolicyAccepted', 'false');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
            <div className="flex justify-between items-center max-w-5xl mx-auto">
                <p className="text-sm">
                    We use cookies to enhance your experience. By accepting, you agree to our use of
                    cookies.{' '}
                    <a href="/privacy-policy" className="underline">
                        Learn more
                    </a>
                    .
                </p>
                <div className="flex space-x-4">
                    <button
                        onClick={handleDecline}
                        className="bg-red-500 px-4 py-2 rounded text-sm text-white hover:bg-red-600"
                    >
                        Decline
                    </button>
                    <button
                        onClick={handleAccept}
                        className="bg-green-500 px-4 py-2 rounded text-sm text-white hover:bg-green-600"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookiePolicy;

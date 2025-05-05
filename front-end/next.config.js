const { i18n } = require('./next-i18next.config');

module.exports = {
    i18n,
    async headers() {
        const cspHeader = `
            font-src 'self';
            object-src 'none';
            base-uri 'self';
            form-action 'self';
            frame-ancestors 'none';
            upgrade-insecure-requests;
            `.replace(/\n/g, '');

        return [
            {
                source: '/',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: cspHeader,
                    },
                ],
            },
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: cspHeader,
                    },
                ],
            },
        ];
    },
};

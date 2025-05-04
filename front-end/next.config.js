const { i18n } = require('./next-i18next.config');

module.exports = {
    i18n,
    async headers() {
        const cspHeader = `
            default-src 'self';
            script-src 'self';
            style-src 'self';
            img-src 'self' blob: data:;
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

import createMiddleWare from 'next-intl/middleware';

export default createMiddleWare({
    locales: ['ro','en','de'],
    defaultLocale: 'ro',
    localeDetection: false,
    domains: [
        {
            domain: 'renadyleurope.com',
            defaultLocale: 'en',
        },
        {
            domain: 'renadyl.ro',
            defaultLocale: 'ro',
        }
    ]
});

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};
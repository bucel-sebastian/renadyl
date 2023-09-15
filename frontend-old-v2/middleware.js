import createMiddleWare from 'next-intl/middleware';

export default createMiddleWare({
    locales: ['ro','en','de'],
    defaultLocale: 'ro',
    localeDetection: false
});

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};
import './globals.css'
import { Sofia_Sans } from 'next/font/google'

import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import LoginHeader from '@/components/headers/LoginHeader';


// export function generateStaticParams() {
//     return [
//         {locale: 'ro'},
//         {locale: 'en'},
//         {locale: 'de'}
//     ];
// }

const sofiaSans = Sofia_Sans({ variable: '--font-sofia-sans',subsets: ['latin'] })


export default async function LocaleLayout({children, params: {locale}}){
    let messages;

    try{
        messages = (await import(`@/messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }

    return(
        <html lang={locale}>
            <body className={`scroll-smoth ${sofiaSans.className} overflow-hidden relative bg-gradient-to-r from-gradientGreen to-gradientPurple min-h-screen after:content-[""] after:bg-backgroundPrimary after:w-[200vw] after:h-screen after:-left-[50%] after:-bottom-[50%] after:left-0 after:absolute after:-rotate-3 `}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <LoginHeader currentLocale={locale}/>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
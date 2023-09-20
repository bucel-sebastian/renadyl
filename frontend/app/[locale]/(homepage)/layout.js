import './globals.css'
import { Sofia_Sans } from 'next/font/google'

import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import HomeHeader from '@/components/headers/HomeHeader'
import Footer from '@/components/Footer'

export function generateStaticParams() {
    return [
        {locale: 'ro'},
        {locale: 'en'},
        {locale: 'de'}
    ];
}

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
            <body className={`scroll-smoth ${sofiaSans.className}`}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <HomeHeader currentLocale={locale}/>
                    {children}
                    <Footer/>
                </NextIntlClientProvider>
                    
            </body>
        </html>
    )
}
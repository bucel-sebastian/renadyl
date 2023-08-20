import './globals.css';
import { Sofia_Sans } from 'next/font/google'


import { NextIntlClientProvider } from "next-intl";
import {notFound} from 'next/navigation';
import Footer from '@/components/Footer';
import NavbarOther from '@/components/NavbarOther';
import { Suspense } from 'react';
import Loading from './loading';

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
        messages = (await import(`../../../messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }

    


    return (
        <html lang={locale}>
            <body className={`scroll-smooth bg-foregroundPrimary ${sofiaSans.className}`}>
                <Suspense>
                    <NextIntlClientProvider locale={locale} messages={messages}>
                        <NavbarOther />
                        <div className='max-w-[1920px] mx-auto'>
                        {children}
                        </div>
                        <Footer />
                    </NextIntlClientProvider>
                </Suspense>
            </body>
        </html>
    )

}
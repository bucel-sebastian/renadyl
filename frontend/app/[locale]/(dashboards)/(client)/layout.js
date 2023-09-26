import { NextIntlClientProvider, useMessages } from 'next-intl';
import './globals.css'
import { Chokokutai, Sofia_Sans } from 'next/font/google'
import { notFound } from 'next/navigation';
import Header from '@/components/dashboard/client/layout/Header';
import Navbar from '@/components/dashboard/client/layout/Navbar';



const sofiaSans = Sofia_Sans({ variable: '--font-sofia-sans',subsets: ['latin'] })

const locales = ['ro','en','de'];

export default function LocaleLayout({children, params: {locale}}){
    let messages = useMessages();

    const isValidLocale = locales.some((cur)=>cur === locale);
    if(!isValidLocale) notFound();

    return(
        <html lang={locale}>
            <body>
                <div className='flex flex-col'>
                    <div>
                        <NextIntlClientProvider locale={locale} messages={messages} >
                            <Header />
                        </NextIntlClientProvider>      
                    </div>
                    <div className='flex flex-row'>
                        <NextIntlClientProvider locale={locale} messages={messages} >
                            <Navbar />
                        </NextIntlClientProvider>    
                        {children}
                    </div>
                </div>
                              
            </body>
        </html>
    )
}
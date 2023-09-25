import './globals.css'
import { Sofia_Sans } from 'next/font/google'

import { NextIntlClientProvider, useMessages } from 'next-intl'
import { useLocale, useTranslations } from 'next-intl'
import { notFound } from 'next/navigation'
import LoginHeader from '@/components/headers/LoginHeader';


const sofiaSans = Sofia_Sans({ variable: '--font-sofia-sans',subsets: ['latin'] })

const locales = ['ro','en','de'];

export default function LocaleLayout({children, params: {locale}}){
    let messages = useMessages();

    const isValidLocale = locales.some((cur)=>cur === locale);
    if(!isValidLocale) notFound();
   

    return(
        <html lang={locale}>
            <body className={`scroll-smoth ${sofiaSans.className} overflow-hidden relative bg-gradient-to-r from-gradientGreen to-gradientPurple min-h-screen before:content-[""] before:bg-backgroundPrimary before:bg-[url('/images/pills_bg.png')] before:bg-[length:500px] before:bg-center before:w-[200vw] before:h-screen before:-left-[50%] before:-bottom-[50%] before:left-0 before:absolute before:-rotate-3 block relative  `}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <LoginHeader currentLocale={locale}/>
                    
                </NextIntlClientProvider>
                {children}
            </body>
        </html>
    )
}
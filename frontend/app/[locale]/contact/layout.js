import '../globals.css'
import {useLocale, NextIntlClientProvider} from 'next-intl'
import {notFound} from 'next/navigation'
import { Sofia_Sans } from 'next/font/google'


import NavbarOther from '../components/NavbarOther';
import Footer from '../components/Footer';
import { Suspense } from 'react';
import Loading from '../loading';

const sofiaSans = Sofia_Sans({ variable: '--font-sofia-sans',subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children, params }) {

  const locale = useLocale();

  if(params.locale !== locale) {
    notFound();
  }

  let messages;
  try{
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }


  return (
    <html lang={locale}>
      <body className={`scroll-smooth ${sofiaSans.className} bg-foregroundPrimary`}>
        <Suspense fallback={<Loading/>}>
          <NextIntlClientProvider locale={locale} messages={messages} >
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

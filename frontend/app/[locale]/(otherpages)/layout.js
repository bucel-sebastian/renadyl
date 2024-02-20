import "./globals.css";
import { Sofia_Sans } from "next/font/google";

import { NextIntlClientProvider, useMessages } from "next-intl";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Footer from "@/components/Footer";
import OtherHeader from "@/components/headers/OtherHeader";
import Loading from "./loading";
import { StoreProvider } from "@/redux/StoreProvider";
import { SessionProvider } from "next-auth/react";

// export function generateStaticParams() {
//     return [
//         {locale: 'ro'},
//         {locale: 'en'},
//         {locale: 'de'}
//     ];
// }

const locales = ["ro", "en", "de"];
const sofiaSans = Sofia_Sans({
  variable: "--font-sofia-sans",
  subsets: ["latin"],
});

export default function LocaleLayout({ children, params: { locale } }) {
  let messages = useMessages();

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  return (
    <html lang={locale}>
      <body className={`scroll-smoth ${sofiaSans.className}`}>
        <Suspense fallback={<Loading />}>
          <StoreProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <OtherHeader currentLocale={locale} />
            </NextIntlClientProvider>
            {children}
            <NextIntlClientProvider locale={locale} messages={messages}>
              <Footer locale={locale} />
            </NextIntlClientProvider>
          </StoreProvider>
        </Suspense>
      </body>
    </html>
  );
}

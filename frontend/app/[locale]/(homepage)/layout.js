import "./globals.css";
import { Sofia_Sans } from "next/font/google";

import { NextIntlClientProvider, useMessages } from "next-intl";
import { useLocale, useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import HomeHeader from "@/components/headers/HomeHeader";
import Footer from "@/components/Footer";
import Loading from "./loading";
import { StoreProvider } from "@/redux/StoreProvider";
import CookiesConsent from "@/components/CookiesConsent";
import ShopOffPopup from "@/components/ShopOffPopup";

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
              <HomeHeader currentLocale={locale} />
            </NextIntlClientProvider>
            {children}
            <NextIntlClientProvider locale={locale} messages={messages}>
              <CookiesConsent locale={locale} />
              <ShopOffPopup locale={locale} />
              <Footer locale={locale} />
            </NextIntlClientProvider>
          </StoreProvider>
        </Suspense>
      </body>
    </html>
  );
}

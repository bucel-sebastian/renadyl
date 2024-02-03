import { NextIntlClientProvider, useMessages } from "next-intl";
import "./globals.css";
import { Chokokutai, Sofia_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import Header from "@/components/dashboard/client/layout/Header";
import Navbar from "@/components/dashboard/client/layout/Navbar";
import { StoreProvider } from "@/redux/StoreProvider";
import SessionProviderInClient from "@/components/SessionProviderInClient";

const sofiaSans = Sofia_Sans({
  variable: "--font-sofia-sans",
  subsets: ["latin"],
});

const locales = ["ro", "en", "de"];

export default function LocaleLayout({
  children,
  params: { locale, session, id },
}) {
  let messages = useMessages();

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  return (
    <html lang={locale}>
      <body
        className={`scroll-smoth ${sofiaSans.className} relative bg-gradient-to-r from-gradientGreen to-gradientPurple p-4 h-screen max-lg:p-0 max-lg:h-auto max-lg:min-h-screen`}
      >
        <SessionProviderInClient session={session}>
          <StoreProvider>
            <div className="flex flex-row bg-backgroundPrimary rounded-2xl h-full overflow-hidden max-lg:rounded-none max-lg:min-h-screen w-full">
              <NextIntlClientProvider locale={locale} messages={messages}>
                <Navbar />
              </NextIntlClientProvider>

              <div className="flex flex-col px-8 py-6 w-5/6 h-full max-h-full overflow-x-hidden overflow-y-auto gap-4 max-lg:px-2 max-lg:w-full">
                <NextIntlClientProvider locale={locale} messages={messages}>
                  <Header currentLocale={locale} params={id} />
                </NextIntlClientProvider>
                {children}
              </div>
            </div>
          </StoreProvider>
        </SessionProviderInClient>
      </body>
    </html>
  );
}

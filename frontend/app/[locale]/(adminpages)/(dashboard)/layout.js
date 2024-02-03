import { NextIntlClientProvider, useMessages } from "next-intl";
import "./globals.css";
import { Chokokutai, Sofia_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import Header from "@/components/dashboard/admin/layout/Header";
import Navbar from "@/components/dashboard/admin/layout/Navbar";
import SessionProviderInClient from "@/components/SessionProviderInClient";

const sofiaSans = Sofia_Sans({
  variable: "--font-sofia-sans",
  subsets: ["latin"],
});

const locales = ["ro", "en", "de"];

export default function LocaleLayout({
  children,
  params: { locale, session },
}) {
  let messages = useMessages();
  const { locale } = params;
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  return (
    <html lang={locale}>
      <body
        className={`scroll-smoth ${sofiaSans.className} relative bg-gradient-to-r from-gradientGreen to-gradientPurple p-4 h-screen max-lg:p-0 max-lg:h-auto max-lg:min-h-screen`}
      >
        <SessionProviderInClient session={session}>
          <div className="flex flex-row bg-backgroundPrimary rounded-2xl h-full overflow-hidden max-lg:rounded-none max-lg:min-h-screen">
            <NextIntlClientProvider locale={locale} messages={messages}>
              <Navbar />
            </NextIntlClientProvider>

            <div className="flex flex-col px-8 py-6 w-5/6 h-full max-h-full overflow-x-hidden overflow-y-auto gap-4">
              <NextIntlClientProvider locale={locale} messages={messages}>
                <Header />
              </NextIntlClientProvider>
              {children}
            </div>
          </div>
        </SessionProviderInClient>
      </body>
    </html>
  );
}

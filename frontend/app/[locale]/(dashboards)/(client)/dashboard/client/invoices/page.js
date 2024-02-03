import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import SessionProviderInClient from "@/components/SessionProviderInClient";
import ClientInvoicesList from "@/components/dashboard/client/ClientInvoicesList";
import { getServerSession } from "next-auth";
import {
  NextIntlClientProvider,
  useTranslations,
  useMessages,
} from "next-intl";
export default function Reset({ params: { locale } }) {
  const session = getServerSession(authOptions);

  let messages = useMessages();

  const locales = ["ro", "en", "de"];

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();
  return (
    <>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <SessionProviderInClient session={session}>
          <ClientInvoicesList />
        </SessionProviderInClient>
      </NextIntlClientProvider>
    </>
  );
}

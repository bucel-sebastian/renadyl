import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import SessionProviderInClient from "@/components/SessionProviderInClient";
import ClientDashboardGreeting from "@/components/dashboard/client/widgets/ClientDashboardGreeting";
import ClientLastOrders from "@/components/dashboard/client/widgets/ClientLastOrders";
import ClientSubscriptionStatus from "@/components/dashboard/client/widgets/ClientSubscriptionStatus";
import { getServerSession } from "next-auth/next";
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";
import { getTranslator } from "next-intl/server";

export default function ClientDashboard({ params: { locale } }) {
  const session = getServerSession(authOptions);
  let messages = useMessages();

  const locales = ["ro", "en", "de"];

  console.log(session);

  const t = useTranslations("Dashboard.client");

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();
  return (
    <>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <SessionProviderInClient session={session}>
          <ClientDashboardGreeting />
          <div className="flex flex-row w-full gap-8 max-lg:flex-col">
            <div className="w-1/2 max-lg:w-full">
              <ClientLastOrders />
            </div>
            <div className="w-1/2 max-lg:w-full">
              <ClientSubscriptionStatus locale={locale} />
            </div>
          </div>
        </SessionProviderInClient>
      </NextIntlClientProvider>
    </>
  );
}

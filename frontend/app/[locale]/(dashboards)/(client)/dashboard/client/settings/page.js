import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import SessionProviderInClient from "@/components/SessionProviderInClient";
import BillingSettings from "@/components/dashboard/client/BillingSettings";
import ClientEditInfo from "@/components/dashboard/client/ClientEditInfo";

import ShippingSettings from "@/components/dashboard/client/ShippingSettings";
import { getServerSession } from "next-auth";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function Settings({ params: { locale } }) {
  const session = getServerSession(authOptions);

  let messages = useMessages();

  const locales = ["ro", "en", "de"];

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();
  return (
    <div className="relative flex flex-col max-h-full overflow-hidden max-lg:overflow-scroll rounded-xl max-lg:max-h-auto">
      <div className="relative block w-full bg-backgroundPrimary h-full overflow-y-auto  max-lg:h-auto px-4 pb-8 pt-4 max-lg:px-0">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="w-full block relative mb-4 border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary ">
            <NextIntlClientProvider locale={locale} messages={messages}>
              <SessionProviderInClient session={session}>
                <ClientEditInfo />
              </SessionProviderInClient>
            </NextIntlClientProvider>
          </div>
        </NextIntlClientProvider>
        <div className="relative w-full flex flex-row gap-4 max-xl:flex-col">
          <div className="w-1/2 border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary max-xl:w-full">
            <NextIntlClientProvider locale={locale} messages={messages}>
              <ShippingSettings />
            </NextIntlClientProvider>
          </div>
          <div className="w-1/2 border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary max-xl:w-full">
            <NextIntlClientProvider locale={locale} messages={messages}>
              <BillingSettings />
            </NextIntlClientProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

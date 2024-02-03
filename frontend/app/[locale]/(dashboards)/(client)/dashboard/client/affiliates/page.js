import ClientAffiliates from "@/components/dashboard/client/ClientAffiliates";
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";

export default function Affiliates({ params: { locale } }) {
  let messages = useMessages();

  const locales = ["ro", "en", "de"];

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  const t = useTranslations("Dashboard");

  return (
    <>
      <div className="relative flex flex-col max-h-full overflow-hidden max-lg:overflow-scroll rounded-xl max-lg:max-h-auto">
        <div className="relative block w-full bg-backgroundPrimary h-full overflow-y-auto  max-lg:h-auto px-4 pb-8 pt-4 max-lg:px-0">
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ClientAffiliates />
          </NextIntlClientProvider>
        </div>
      </div>
    </>
  );
}

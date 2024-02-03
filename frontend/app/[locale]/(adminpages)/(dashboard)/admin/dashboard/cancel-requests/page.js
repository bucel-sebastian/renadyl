import CancelRequestsList from "@/components/dashboard/admin/widgets/CancelRequestsList";
import ClientsList from "@/components/dashboard/admin/widgets/ClientsList";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function page({ params: { locale } }) {
  let messages = useMessages();
  const locales = ["ro", "en", "de"];

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  return (
    <div className="relative flex flex-col max-h-full overflow-hidden rounded-xl border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary">
      <NextIntlClientProvider locale={locale} messages={messages}>
        <CancelRequestsList />
      </NextIntlClientProvider>
    </div>
  );
}

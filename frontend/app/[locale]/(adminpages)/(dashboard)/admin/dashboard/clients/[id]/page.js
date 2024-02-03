import ClientDetails from "@/components/dashboard/admin/widgets/ClientDetails";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { notFound } from "next/navigation";

export default function page({ params: { locale, id } }) {
  let messages = useMessages();
  const locales = ["ro", "en", "de"];

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  if (id === null) notFound();

  return (
    <div className="relative flex flex-col gap-4">
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ClientDetails id={id} locale={locale} />
      </NextIntlClientProvider>
    </div>
  );
}

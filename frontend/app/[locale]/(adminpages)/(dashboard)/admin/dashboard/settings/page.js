import WebsiteSettings from "@/components/dashboard/admin/widgets/WebsiteSettings";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function page({ params: { locale } }) {
  let messages = useMessages();
  const locales = ["ro", "en", "de"];

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();
  return (
    <>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <WebsiteSettings />
      </NextIntlClientProvider>
    </>
  );
}

import ContactFormList from "@/components/dashboard/admin/widgets/ContactFormList";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function page({ params: { locale } }) {
  let messages = useMessages();
  const locales = ["ro", "en", "de"];

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  return (
    <div className="relative flex flex-col max-h-full overflow-hidden">
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ContactFormList />
      </NextIntlClientProvider>
    </div>
  );
}

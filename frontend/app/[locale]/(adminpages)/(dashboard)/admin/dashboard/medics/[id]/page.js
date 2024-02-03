import DoctorDetails from "@/components/dashboard/admin/widgets/DoctorDetails";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function page({ params: { locale, id } }) {
  let messages = useMessages();
  const locales = ["ro", "en", "de"];

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();
  return (
    <>
      <div className="relative flex flex-col gap-4">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <DoctorDetails id={id} locale={locale} />
        </NextIntlClientProvider>
      </div>
    </>
  );
}

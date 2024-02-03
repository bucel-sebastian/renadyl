import EditProductForm from "@/components/dashboard/admin/widgets/EditProductForm";
import StocksForm from "@/components/dashboard/admin/widgets/StocksForm";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function page({ params: { locale } }) {
  let messages = useMessages();

  const locales = ["ro", "en", "de"];
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  return (
    <>
      <div className="relative flex flex-col gap-4">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <EditProductForm />
          <div className="w-full border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary z-50">
            <StocksForm />
          </div>
        </NextIntlClientProvider>
      </div>
    </>
  );
}

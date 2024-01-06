import OrdersList from "@/components/dashboard/admin/widgets/OrdersList";
import OrderDetails from "@/components/dashboard/admin/widgets/order/OrderDetails";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function page({ params: { locale, id } }) {
  let messages = useMessages();
  const locales = ["ro", "en", "de"];

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  return (
    <div className="relative flex flex-col ">
      <NextIntlClientProvider messages={messages} locale={locale}>
        <OrderDetails orderId={id} />
      </NextIntlClientProvider>
    </div>
  );
}

import ActualMonthSales from "@/components/dashboard/admin/charts/ActualMonthSales";
import LastOrders from "@/components/dashboard/admin/widgets/LastOrders";
import MonthlyPeople from "@/components/dashboard/admin/widgets/MonthlyPeople";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function page({params: {locale}}) {
  let messages = useMessages();

  const locales = ['ro','en','de'];

    const isValidLocale = locales.some((cur)=>cur === locale);
    if(!isValidLocale) notFound();
  return (
    <div className="relative flex flex-col gap-4">

      <div className="relative w-full">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ActualMonthSales/>
        </NextIntlClientProvider>
      </div>
      <div className="relative w-full flex flex-row gap-4 ">
        <div className="w-1/2">
          <NextIntlClientProvider locale={locale} messages={messages}>
            <LastOrders />

          </NextIntlClientProvider>
        </div>
        <div className="w-1/2">
          <div className="w-full flex flex-row flex-wrap gap-4 justify-between">
            <NextIntlClientProvider locale={locale} messages={messages}>
              <MonthlyPeople type="client" />
              <MonthlyPeople type="medic" />
              <MonthlyPeople type="distributor" />
              <MonthlyPeople type="affiliate" />
            </NextIntlClientProvider>
          </div>
        </div>
      </div>
      

    </div>
  )
}

 
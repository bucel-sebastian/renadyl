import InvoicesList from "@/components/dashboard/admin/widgets/InvoicesList";
import { NextIntlClientProvider, useMessages } from "next-intl";


export default function page({params: {locale}}) {
    let messages = useMessages();
    const locales = ['ro','en','de'];

    const isValidLocale = locales.some((cur)=>cur === locale);
    if(!isValidLocale) notFound();

    return(
        <div className="relative flex flex-col w-full">
            <NextIntlClientProvider locale={locale} messages={messages}>
                <InvoicesList />
            </NextIntlClientProvider>
        </div>
    )
}
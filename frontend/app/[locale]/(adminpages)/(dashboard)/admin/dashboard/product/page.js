import EditProductForm from "@/components/dashboard/admin/widgets/EditProductForm";
import StocksForm from "@/components/dashboard/admin/widgets/StocksForm";
import { NextIntlClientProvider, useMessages } from "next-intl";


export default function page({params: {locale}}) {
    let messages = useMessages();

    const locales = ['ro','en','de'];
    const isValidLocale = locales.some((cur)=>cur === locale);
    if(!isValidLocale) notFound();

    return(
        <>
            <div className="relative">
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <EditProductForm />
                    <StocksForm />
                </NextIntlClientProvider>
            </div>
        </>
    )
}
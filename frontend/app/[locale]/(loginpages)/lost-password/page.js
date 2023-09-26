import ForgotPassForm from "@/components/login/ForgotPassForm";
import { NextIntlClientProvider, useMessages, useTranslations } from "next-intl";
import { getTranslator } from "next-intl/server";


export async function generateMetadata({params: {locale}}) {
    const t = await getTranslator(locale, 'Forgot-pass');
   
    return {
      title: `Renadyl™ -  ${t('page-title')}`
    };
  }


export default function LostPassword({params: {locale}}) {

    let messages = useMessages();

    const t = useTranslations("Forgot-pass");

    const locales = ['ro','en','de'];

    const isValidLocale = locales.some((cur)=>cur === locale);
    if(!isValidLocale) notFound();

    return (
        <main className="relative w-full h-screen flex justify-center content-center items-center ">
        <div className="bg-backgroundPrimary border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-8 px-12">
            <h2 className="text-center font-bold text-3xl">
                {t("heading")}
            </h2>
            <p className="text-center">
                {t("desc")}

            </p>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <ForgotPassForm />
            </NextIntlClientProvider>
        </div>
    </main>
    )
}
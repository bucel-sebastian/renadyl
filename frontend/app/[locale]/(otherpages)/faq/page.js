import FaqAccordion from "@/components/FaqAccordion";
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";
import { getTranslator } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslator(locale, "Faq");

  return {
    title: `Renadyl™ -  ${t("page-title")}`,
  };
}

export default function Faq({ params: { locale } }) {
  let messages = useMessages();

  const locales = ["ro", "en", "de"];

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  const t = useTranslations("Faq");

  return (
    <main className=" block  pt-[90px] text-lg">
      <section className="flex flex-col max-w-[1200px] w-full mx-auto pt-4 pb-8 max-md:px-2 max-md:pb-2">
        <h1 className="text-4xl text-center pb-4">{t("title")}</h1>
        <p className="text-center">{t("desc")}</p>
      </section>
      <section className="flex flex-col max-w-[1200px] w-full mx-auto pt-4 pb-8 max-md:px-2 max-md:pb-2">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <FaqAccordion />
        </NextIntlClientProvider>
      </section>
    </main>
  );
}

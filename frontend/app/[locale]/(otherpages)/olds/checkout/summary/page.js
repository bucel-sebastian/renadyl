import Summary from "@/components/buy/Summary";
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";
import { getTranslator } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslator(locale, "Order-summary");
  return {
    title: `${t("page-title")} - Renadyl™`,
    desc: "",
  };
}

export default function OrderSummaryPage({ params: { locale } }) {
  let messages = useMessages();

  const locales = ["ro", "en", "de"];

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  const t = useTranslations("Order-summary");

  return (
    <main className="block pt-[90px] text-lg">
      <div className="flex flex-row items-center content-center justify-center mb-8">
        <div className="text-xl relative flex justify-center">
          <span className="flex items-center content-center justify-center w-[40px] h-[40px] border-[2px] border-gradientPurple rounded-full">
            1
          </span>
          <span className="absolute top-full text-sm text-center w-max">
            {t("order-steps.step-1")}
          </span>
        </div>
        <div className="w-[100px] h-[2px] bg-gradientGreen"></div>
        <div className="text-xl relative flex justify-center">
          <span className="flex items-center content-center justify-center w-[40px] h-[40px] border-[2px] border-gradientPurple rounded-full">
            2
          </span>
          <span className="absolute top-full text-sm text-center w-max">
            {t("order-steps.step-2")}
          </span>
        </div>
        <div className="w-[100px] h-[2px] bg-gradientGreen"></div>
        <div className="text-xl relative flex justify-center">
          <span className="flex items-center content-center justify-center w-[40px] h-[40px] border-[2px] border-gradientPurple rounded-full">
            3
          </span>
          <span className="absolute top-full text-sm text-center w-max">
            {t("order-steps.step-3")}
          </span>
        </div>
        <div className="w-[100px] h-[2px] bg-foregroundPrimary20"></div>
        <div className="text-xl relative flex justify-center">
          <span className="flex items-center content-center justify-center w-[40px] h-[40px] border-[2px] border-foregroundPrimary30 rounded-full">
            4
          </span>
          <span className="absolute top-full text-sm text-center w-max">
            {t("order-steps.step-4")}
          </span>
        </div>
      </div>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Summary />
      </NextIntlClientProvider>
    </main>
  );
}

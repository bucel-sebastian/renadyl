import { getTranslator } from "next-intl/server";
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";

import Link from "next-intl/link";
import Checkout from "@/components/buy/checkout/Checkout";
import LinkWithRef from "next-intl/link";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslator(locale, "Checkout");
  return {
    title: `${t("page-title")} - Renadyl™`,
    desc: "",
  };
}

export default function CheckoutPage({ params: { locale } }) {
  let messages = useMessages();

  const locales = ["ro", "en", "de"];

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  const t = useTranslations("Checkout");

  return (
    <main className="relative block pt-[90px] text-lg min-h-screen h-full checkout-background pb-12">
      <div className="relative flex flex-row items-center content-center justify-center mb-8 z-10">
        <Link href="/cart" locale={locale}>
          <div className="relative text-xl relative flex justify-center ">
            <span className="relative flex items-center content-center justify-center bg-backgroundPrimary w-[40px] h-[40px] border-[2px] border-gradientPurple rounded-full ">
              1
            </span>
            <span className="absolute top-full text-sm text-center w-max max-md:text-[10px]">
              {t("order-steps.step-1")}
            </span>
          </div>
        </Link>
        <div className="w-[100px] h-[2px] bg-gradientGreen max-md:w-[40px]"></div>
        <div className="text-xl relative flex justify-center">
          <span className="relative flex items-center content-center justify-center bg-backgroundPrimary w-[40px] h-[40px] border-[2px] border-gradientPurple rounded-full ">
            2
          </span>
          <span className="absolute top-full text-sm text-center w-max max-md:text-[10px]">
            {t("order-steps.step-2")}
          </span>
        </div>
        <div className="w-[100px] h-[2px] bg-foregroundPrimary20 max-md:w-[40px]"></div>
        <div className="text-xl relative flex justify-center">
          <span className="flex items-center content-center justify-center w-[40px] h-[40px] border-[2px] border-foregroundPrimary30 rounded-full bg-backgroundPrimary">
            3
          </span>
          <span className="absolute top-full text-sm text-center w-max max-md:text-[10px]">
            {t("order-steps.step-3")}
          </span>
        </div>
        <div className="w-[100px] h-[2px] bg-foregroundPrimary20 max-md:w-[40px]"></div>
        <div className="text-xl relative flex justify-center">
          <span className="flex items-center content-center justify-center w-[40px] h-[40px] border-[2px] border-foregroundPrimary30 rounded-full bg-backgroundPrimary ">
            4
          </span>
          <span className="absolute top-full text-sm text-center w-max max-md:text-[10px]">
            {t("order-steps.step-4")}
          </span>
        </div>
      </div>
      <section className="block relative max-w-[1200px] w-full mx-auto z-10 max-[1200px]:px-2">
        <Checkout locale={locale} messages={messages} />
      </section>
    </main>
  );
}

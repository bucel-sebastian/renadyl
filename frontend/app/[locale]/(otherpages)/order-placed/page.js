import { getTranslator } from "next-intl/server";
import {
  Link,
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";

import {
  FaTruckFast,
  FaMoneyBills,
  FaFileInvoiceDollar,
} from "react-icons/fa6";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslator(locale, "Order-summary");
  return {
    title: `Renadyl™ -  ${t("page-title")}`,
    desc: "",
  };
}

export default function CheckoutPage({ params: { locale } }) {
  let messages = useMessages();

  const locales = ["ro", "en", "de"];

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  const t = useTranslations("Order-summary");

  return (
    <main className="relative block pt-[90px] text-lg min-h-screen h-full checkout-background">
      <div className="relative flex flex-row items-center content-center justify-center mb-8 z-10">
        <div className="relative text-xl relative flex justify-center ">
          <span className="relative flex items-center content-center justify-center bg-backgroundPrimary w-[40px] h-[40px] border-[2px] border-gradientPurple rounded-full ">
            1
          </span>
          <span className="absolute top-full text-sm text-center w-max">
            {t("order-steps.step-1")}
          </span>
        </div>
        <div className="w-[100px] h-[2px] bg-gradientGreen"></div>
        <div className="text-xl relative flex justify-center">
          <span className="relative flex items-center content-center justify-center bg-backgroundPrimary w-[40px] h-[40px] border-[2px] border-gradientPurple rounded-full ">
            2
          </span>
          <span className="absolute top-full text-sm text-center w-max">
            {t("order-steps.step-2")}
          </span>
        </div>
        <div className="w-[100px] h-[2px] bg-gradientGreen"></div>
        <div className="text-xl relative flex justify-center">
          <span className="relative flex items-center content-center justify-center bg-backgroundPrimary w-[40px] h-[40px] border-[2px] border-gradientPurple rounded-full">
            3
          </span>
          <span className="absolute top-full text-sm text-center w-max">
            {t("order-steps.step-3")}
          </span>
        </div>
        <div className="w-[100px] h-[2px] bg-gradientGreen"></div>
        <div className="text-xl relative flex justify-center">
          <span className="relative flex items-center content-center justify-center bg-backgroundPrimary w-[40px] h-[40px] border-[2px] border-gradientPurple rounded-full">
            4
          </span>
          <span className="absolute top-full text-sm text-center w-max">
            {t("order-steps.step-4")}
          </span>
        </div>
      </div>
      <section className="block relative max-w-[1200px] w-full mx-auto z-10 max-[1200px]:px-2">
        <div className="w-full border-[#1a1a1a55] bg-[#fff] border-[1px]  rounded-xl shadow-xl p-6">
          <h1 className="text-3xl font-bold mb-4 text-center ">
            {t("summary-title")}
          </h1>
        </div>
      </section>
    </main>
  );
}
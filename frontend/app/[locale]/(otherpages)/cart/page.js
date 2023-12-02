import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";
import { getTranslator } from "next-intl/server";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";

import { FaMinus, FaPlus } from "react-icons/fa6";
import CartProductsBox from "@/components/buy/cart/CartProductsBox";
import CartSummaryBox from "@/components/buy/cart/CartSummaryBox";
import { StoreProvider } from "@/redux/StoreProvider";
import CartPromocodeBox from "@/components/buy/cart/CartPromocodeBox";
import CartOffersBox from "@/components/buy/cart/CartOffersBox";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslator(locale, "Cart");
  return {
    title: `Renadyl™ -  ${t("page-title")}`,
    desc: "",
  };
}

export default function CartPage({ params: { locale } }) {
  let messages = useMessages();

  const locales = ["ro", "en", "de"];

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  const t = useTranslations("Cart");

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
        <div className="w-[100px] h-[2px] bg-foregroundPrimary20"></div>
        <div className="text-xl relative flex justify-center">
          <span className="flex items-center content-center justify-center w-[40px] h-[40px] border-[2px] border-foregroundPrimary30 rounded-full bg-backgroundPrimary">
            2
          </span>
          <span className="absolute top-full text-sm text-center w-max">
            {t("order-steps.step-2")}
          </span>
        </div>
        <div className="w-[100px] h-[2px] bg-foregroundPrimary20"></div>
        <div className="text-xl relative flex justify-center">
          <span className="flex items-center content-center justify-center w-[40px] h-[40px] border-[2px] border-foregroundPrimary30 rounded-full bg-backgroundPrimary">
            3
          </span>
          <span className="absolute top-full text-sm text-center w-max">
            {t("order-steps.step-3")}
          </span>
        </div>
        <div className="w-[100px] h-[2px] bg-foregroundPrimary20"></div>
        <div className="text-xl relative flex justify-center">
          <span className="flex items-center content-center justify-center w-[40px] h-[40px] border-[2px] border-foregroundPrimary30 rounded-full bg-backgroundPrimary">
            4
          </span>
          <span className="absolute top-full text-sm text-center w-max">
            {t("order-steps.step-4")}
          </span>
        </div>
      </div>
      <section className="block relative max-w-[1200px] w-full mx-auto z-10 max-[1200px]:px-2">
        <div></div>
        <div className="flex flex-row gap-4 max-[1200px]:flex-col">
          <div className="flex flex-col w-4/6 gap-4 max-[1200px]:w-full">
            <div className="w-full border-[#1a1a1a55] bg-[#fff] border-[1px]  rounded-xl shadow-xl p-6">
              <h1 className="text-2xl font-bold mb-4 ">{t("cart-title")}</h1>
              <NextIntlClientProvider locale={locale} messages={messages}>
                <StoreProvider>
                  <CartProductsBox />
                </StoreProvider>
              </NextIntlClientProvider>
            </div>
            <div className="w-full border-[#1a1a1a55] bg-[#fff] border-[1px]  rounded-xl shadow-xl p-6">
              <NextIntlClientProvider locale={locale} messages={messages}>
                <StoreProvider>
                  <CartOffersBox />
                </StoreProvider>
              </NextIntlClientProvider>
            </div>
          </div>
          <div className="flex flex-col w-2/6 gap-4 max-[1200px]:flex-col-reverse max-[1200px]:w-full max-[1200px]:mb-4">
            <div className="w-full border-[#1a1a1a55] bg-[#fff] border-[1px]  rounded-xl shadow-xl p-6">
              <h1 className="text-2xl font-bold mb-4 ">{t("summary-title")}</h1>
              <NextIntlClientProvider locale={locale} messages={messages}>
                <StoreProvider>
                  <CartSummaryBox currentLocale={locale} />
                </StoreProvider>
              </NextIntlClientProvider>
            </div>
            <div className="w-full border-[#1a1a1a55] bg-[#fff] border-[1px]  rounded-xl shadow-xl p-6">
              <h1 className="text-2xl font-bold mb-4 px-2">
                {t("promocode-title")}
              </h1>
              <NextIntlClientProvider locale={locale} messages={messages}>
                <StoreProvider>
                  <CartPromocodeBox />
                </StoreProvider>
              </NextIntlClientProvider>
            </div>
          </div>
          {/* <div className="flex flex-row gap-4"></div>
          <div className="flex flex-row gap-4">
            
          </div> */}
        </div>
      </section>
    </main>
  );
}

import HomeSlider from "@/components/HomeSlider";
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";
import Image from "next/image";
import Link from "next-intl/link";

import { Suspense } from "react";
import Loading from "./loading";
import { getTranslator } from "next-intl/server";
import { useDispatch } from "react-redux";
import AddToCartButtonHome from "@/components/buy/AddToCartButtonHome";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslator(locale, "Index");

  return {
    title: `Renadyl™ -  ${t("page-title")}`,
    description: `${t("page-desc")}`,
    keywords: [
      t("page-keywords.1"),
      t("page-keywords.2"),
      t("page-keywords.3"),
    ],
  };
}

export default function Index({ params: { locale } }) {
  let messages = useMessages();

  const locales = ["ro", "en", "de"];

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();
  const t = useTranslations("Index");

  return (
    <main className="bg-foregroundPrimary w-full h-screen relative overflow-hidden">
      <Suspense fallback={<Loading />}>
        <HomeSlider />
      </Suspense>
      <br />
      <br />
      <br />
      <br />
      <div className="flex flex-row gap-[50px] absolute bottom-10 w-content w-full justify-center max-sm:flex-col max-sm:gap-2 max-sm:items-center max-sm:bottom-20">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AddToCartButtonHome currentLocale={locale} />
        </NextIntlClientProvider>

        <Link
          href="/product"
          locale={locale}
          className="block bg-gradient-to-r w-[300px] from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-3xl text-backgroundPrimary rounded-2xl py-3"
        >
          {t("about-btn")}
        </Link>
      </div>
    </main>
  );
}

import { getTranslator } from "next-intl/server";
import Image from "next/image";

import img1 from "@/public/images/product_image_1.png";
import BuyContainer from "@/components/buy/BuyContainer";
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";

export function generateMetadata({ params: { locale } }) {
  // const t = getTranslator("Buy");
}

export default function Buy({ params: { locale } }) {
  let messages = useMessages();

  const locales = ["ro", "en", "de"];

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  const t = useTranslations("Buy");

  return (
    <main className="block pt-[90px] text-lg">
      <NextIntlClientProvider locale={locale} messages={messages}>
        <BuyContainer />
      </NextIntlClientProvider>
    </main>
  );
}

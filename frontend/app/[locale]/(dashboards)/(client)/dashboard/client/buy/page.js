import DashboardAddToCartProduct from "@/components/dashboard/client/DashboardAddToCartProduct";
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";
import Image from "next/image";

export default function Buy({ params: { locale } }) {
  let messages = useMessages();

  const locales = ["ro", "en", "de"];
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  const t = useTranslations("Dashboard");
  return (
    <>
      <div className="max-h-full flex flex-row gap-4 max-xl:flex-col">
        <div className="w-full border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary flex flex-row gap-4 max-md:flex-col">
          <div className="w-1/5 max-md:mx-auto max-md:w-full">
            <Image
              src="/images/product_image_1.png"
              width={1000}
              height={1000}
              className="w-full aspect-square max-md:max-w-[400px] max-md:mx-auto"
              alt=""
            />
          </div>
          <div className="w-4/5  max-md:mx-auto max-md:w-full">
            <h2 className="text-3xl mb-2 max-sm:text-xl">
              {t("client.buy.product-name-renal-single")}
            </h2>
            <p>{t("client.buy.product-desc-renal-single")}</p>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <DashboardAddToCartProduct
                product="renal_single"
                currentLocale={locale}
              />
            </NextIntlClientProvider>
          </div>
        </div>
        <div className="w-full border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary flex flex-row gap-4 max-md:flex-col ">
          <div className="w-1/5 max-md:mx-auto max-md:w-full">
            <Image
              src="/images/product_image_5.png"
              width={1000}
              height={1000}
              className="w-full aspect-square max-md:max-w-[400px] max-md:mx-auto"
              alt=""
            />
          </div>
          <div className="w-4/5  max-md:mx-auto max-md:w-full">
            <h2 className=" text-3xl mb-2 max-sm:text-xl">
              {t("client.buy.product-name-renal-bundle")}
            </h2>
            <p>{t("client.buy.product-desc-renal-bundle")}</p>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <DashboardAddToCartProduct
                product="renal_bundle"
                currentLocale={locale}
              />
            </NextIntlClientProvider>
          </div>
        </div>
      </div>
    </>
  );
}

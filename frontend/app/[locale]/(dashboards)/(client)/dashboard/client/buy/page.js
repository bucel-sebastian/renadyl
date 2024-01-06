import DashboardAddToCartProduct from "@/components/dashboard/client/DashboardAddToCartProduct";
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";
import Image from "next/image";

export default function Reset({ params: { locale } }) {
  let messages = useMessages();

  const locales = ["ro", "en", "de"];
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  const t = useTranslations("Dashboard");
  return (
    <>
      <div className="max-h-full flex flex-row gap-4">
        <div className="w-full border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary flex flex-row gap-4">
          <div className="w-1/5">
            <Image
              src="/images/product_image_1.png"
              width={1000}
              height={1000}
              className="w-full aspect-square"
              alt=""
            />
          </div>
          <div className="w-4/5">
            <h2 className="text-3xl mb-2">
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
        <div className="w-full border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary flex flex-row gap-4 ">
          <div className="w-1/5">
            <Image
              src="/images/product_image_2.png"
              width={1000}
              height={1000}
              className="w-full aspect-square"
              alt=""
            />
          </div>
          <div className="w-4/5">
            <h2 className=" text-3xl mb-2">
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

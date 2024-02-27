import { useMessages, useTranslations } from "next-intl";
import { getTranslator } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslator(locale, "Shipping-and-payment");

  return {
    title: `Renadyl™ -  ${t("page-title")}`,
  };
}

export default function Page({ params: { locale } }) {
  let messages = useMessages();

  const t = useTranslations("Shipping-and-payment");

  const locales = ["ro", "en", "de"];

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  return (
    <main className="block pt-[90px] text-lg">
      <section className="flex flex-col max-w-[1200px] w-full mx-auto pt-4 pb-8 max-md:px-2 max-md:pb-2">
        <h1 className="text-4xl text-center pb-4">{t("title")}</h1>
        {/* <p className="text-center">{t("desc")}</p> */}
      </section>
      <section className="flex flex-col max-w-[1200px] w-full mx-auto pt-4 pb-8 max-md:px-2 max-md:pb-2 text-justify">
        <h2 className="text-2xl">1. {t("heading-1")}</h2>
        <p>1.1. {t("p-1-1")}</p>
        <p>1.2. {t("p-1-2")}</p>
        <p>1.3. {t("p-1-3")}</p>
        <p>1.4. {t("p-1-4")}</p>

        <h2 className="text-2xl mt-4">2. {t("heading-2")}</h2>
        <p>2.1. {t("p-2-1")}</p>

        <h2 className="text-2xl mt-4">3. {t("heading-3")}</h2>
        <p>3.1. {t("p-3-1")}</p>
        <p>{t("p-3-2")}</p>
        <p>3.2. {t("p-3-3")}</p>

        <h2 className="text-2xl mt-4">4. {t("heading-4")}</h2>
        <p>4.1.{t("p-4-1")}</p>
        <p>4.2.{t("p-4-2")}</p>
        <p>4.3.{t("p-4-3")}</p>
        <p>4.4.{t("p-4-4")}</p>

        <h2 className="text-2xl mt-4">5. {t("heading-5")}</h2>
        <p>5.1. {t("p-5-1")}</p>
        <p>5.2. {t("p-5-2")}</p>

        <h2 className="text-2xl mt-4">6. {t("heading-6")}</h2>
        <h3 className="text-xl mt-4">6.1. {t("heading-6-1")}</h3>
        <p>6.1.1. {t("p-6-1")}</p>
        <p>6.1.2. {t("p-6-2")}</p>
        <h3 className="text-xl mt-4">6.2. {t("heading-7")}</h3>
        <p>6.2.1. {t("p-7-1")}</p>
        <p>6.2.2. {t("p-7-2")}</p>
        <p>6.2.3. {t("p-7-3")}</p>
        <p>6.2.4. {t("p-7-4")}</p>
        <h3 className="text-xl mt-4">6.3. {t("heading-8")}</h3>
        <p>6.3.1.{t("p-8-1")}</p>
        <p>6.3.2.{t("p-8-2")}</p>
        <p>6.3.3.{t("p-8-3")}</p>
        <p>6.3.4.{t("p-8-4")}</p>
        <h3 className="text-xl mt-4">6.4. {t("heading-10")}</h3>
        <p>6.4.1. {t("p-10-1")}</p>
        <p>
          6.4.2.
          {t("p-10-2")}
        </p>
        <p>6.4.3. {t("p-10-3")}</p>

        <h2 className="text-2xl mt-4">7. {t("heading-11-1")}</h2>
        <h3 className="text-xl mt-4">7.1. {t("heading-11")}</h3>
        <p>7.1.1. {t("p-11-1")}</p>
        <p>7.1.2. {t("p-11-2")}</p>
        <p>7.1.3. {t("p-11-3")}</p>
        <p>7.1.4. {t("p-11-4")}</p>
        <p>7.1.5. {t("p-11-5")}</p>
        <p>7.1.6. {t("p-11-6")}</p>
        <p>7.1.7. {t("p-11-7")}</p>
        <p>7.1.8. {t("p-11-8")}</p>
        <h3 className="text-xl mt-4">7.2. {t("heading-12")}</h3>
        <p>{t("p-12-1")}</p>

        <h2 className="text-2xl mt-4">8. {t("heading-13")}</h2>
        <p>8.1. {t("p-13-1")}</p>
      </section>
    </main>
  );
}

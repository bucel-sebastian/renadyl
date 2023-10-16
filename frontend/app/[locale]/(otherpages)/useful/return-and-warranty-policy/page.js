import { useMessages, useTranslations } from "next-intl";
import { getTranslator } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslator(locale, "");

  return {
    title: `Renadyl™ -  ${t("page-title")}`,
  };
}

export default function Page({ params: { locale } }) {
  let messages = useMessages();

  const t = useTranslations("Return-and-warranty-policy");

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
        <h2 className="text-2xl ">{t("heading-1")}</h2>
        <p>{t("p-1-1")}</p>
        <p>{t("p-1-2")}</p>
        <h2 className="text-2xl mt-4">{t("heading-2")}</h2>
        <p>{t("p-2-1")}</p>
        <ul className="list-disc pl-8">
          <li>
            <p>{t("p-2-2")}</p>
          </li>
          <li>
            <p>{t("p-2-3")}</p>
          </li>
          <li>
            <p>{t("p-2-4")}</p>
          </li>
        </ul>
        <h2 className="text-2xl mt-4">{t("heading-3")}</h2>
        <p>{t("p-3-1")}</p>
      </section>
    </main>
  );
}

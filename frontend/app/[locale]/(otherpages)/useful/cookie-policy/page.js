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

  const t = useTranslations("Cookie-policy");

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
        <p>{t("p-1-3")}</p>

        <h2 className="text-2xl mt-4">{t("heading-2")}</h2>
        <p>{t("p-2-1")}</p>

        <h2 className="text-2xl mt-4">{t("heading-3")}</h2>
        <p>{t("p-3-1")}</p>

        <h2 className="text-2xl mt-4">{t("heading-4")}</h2>
        <ul className="list-disc pl-8">
          <li>
            <p>{t("p-4-1")}</p>
          </li>
          <li>
            <p>{t("p-4-2")}</p>
          </li>
        </ul>

        <h2 className="text-2xl mt-4">{t("heading-5")}</h2>
        <p>{t("p-5-1")}</p>
        <p>{t("p-5-2")}</p>
        <p>{t("p-5-3")}</p>

        <h2 className="text-2xl mt-4">{t("heading-6")}</h2>
        <p>{t("p-6-1")}</p>
        <p>{t("p-6-2")}</p>
        <p>{t("p-6-3")}</p>
        <p>{t("p-6-4")}</p>

        <h2 className="text-2xl mt-4">{t("heading-7")}</h2>
        <p>{t("p-7-1")}</p>
        <p>{t("p-7-2")}</p>

        <h2 className="text-2xl mt-4">{t("heading-8")}</h2>
        <p>{t("p-8-1")}</p>

        <h2 className="text-2xl mt-4">{t("heading-9")}</h2>
        <p>{t("p-9-1")}</p>

        <h2 className="text-2xl mt-4">{t("heading-10")}</h2>
        <p>{t("p-10-1")}</p>

        <h2 className="text-2xl mt-4">{t("heading-11")}</h2>
        <p>{t("p-11-1")}</p>
        <ul className="list-disc pl-8">
          <li>
            <p>{t("p-11-2")}</p>
          </li>
          <li>
            <p>{t("p-11-3")}</p>
          </li>
          <li>
            <p>{t("p-11-4")}</p>
          </li>
          <li>
            <p>{t("p-11-5")}</p>
          </li>
        </ul>

        <h2 className="text-2xl mt-4">{t("heading-12")}</h2>
        <p>{t("p-12-1")}</p>
        <p>{t("p-12-2")}</p>

        <h2 className="text-2xl mt-4">{t("heading-13")}</h2>
        <p>{t("p-13-1")}</p>
        <p>{t("p-13-2")}</p>

        <h2 className="text-2xl mt-4">{t("heading-14")}</h2>
        <p>{t("p-14-1")}</p>

        <h2 className="text-2xl mt-4">{t("heading-15")}</h2>
        <p>{t("p-15-1")}</p>

        <h2 className="text-2xl mt-4">{t("heading-16")}</h2>
        <p>{t("p-16-1")}</p>
        <p>{t("p-16-2")}</p>
        <p>{t("p-16-3")}</p>
        <p>{t("p-16-4")}</p>
        <p>{t("p-16-5")}</p>

        <h2 className="text-2xl mt-4">{t("heading-17")}</h2>
        <p>{t("p-17-1")}</p>
        <p>{t("p-17-2")}</p>
        <ul className="list-disc pl-8">
          <li>
            <p>{t("p-17-3")}</p>
          </li>
          <li>
            <p>{t("p-17-4")}</p>
          </li>
          <li>
            <p>{t("p-17-5")}</p>
          </li>
          <li>
            <p>{t("p-17-6")}</p>
          </li>
          <li>
            <p>{t("p-17-7")}</p>
          </li>
        </ul>

        <p>{t("p-17-8")}</p>
        <p>{t("p-17-9")}</p>
        <p>{t("p-17-10")}</p>

        <h2 className="text-2xl mt-4">{t("heading-18")}</h2>
        <p>{t("p-18-1")}</p>
        <p>{t("p-18-2")}</p>
        <p>{t("p-18-3")}</p>
        <p>{t("p-18-4")}</p>

        <h2 className="text-2xl mt-4">{t("heading-19")}</h2>
        <p>{t("p-19-1")}</p>
        <p>{t("p-19-2")}</p>
        <p>{t("p-19-3")}</p>
        <p>{t("p-19-4")}</p>
        <p>{t("p-19-5")}</p>
        <p>{t("p-19-6")}</p>
        <p>{t("p-19-7")}</p>
      </section>
    </main>
  );
}

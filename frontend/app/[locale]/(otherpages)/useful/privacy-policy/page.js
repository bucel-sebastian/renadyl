import { useMessages, useTranslations } from "next-intl";
import { getTranslator } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslator(locale, "Privacy-policy");

  return {
    title: `Renadyl™ -  ${t("page-title")}`,
  };
}

export default function Page({ params: { locale } }) {
  let messages = useMessages();

  const t = useTranslations("Privacy-policy");

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
        <p>{t("p-1")}</p>
        <h2 className="text-2xl mt-4">{t("heading-1")}</h2>
        <p>{t("p-1-1")}</p>
        <ul className="list-disc pl-8">
          <li>
            <p>{t("p-1-2")}</p>
          </li>
          <li>
            <p>{t("p-1-3")}</p>
          </li>
          <li>
            <p>{t("p-1-4")}</p>
          </li>
        </ul>
        <h2 className="text-2xl mt-4">{t("heading-2")}</h2>
        <p>{t("p-2-1")}</p>

        <ul className="list-disc pl-8">
          <li>
            <p>{t("p-2-2")}</p>
          </li>
          <li>
            <p>{t("p-2-3")}</p>
          </li>
        </ul>

        <p>{t("p-2-4")}</p>
        <p>{t("p-2-5")}</p>

        <ul className="list-disc pl-8">
          <li>
            <p>{t("p-2-6")}</p>
          </li>
          <li>
            <p>{t("p-2-7")}</p>
          </li>
        </ul>
        <p>{t("p-2-8")}</p>
        <p>{t("p-2-9")}</p>
        <ul className="list-disc pl-8">
          <li>
            <p>{t("p-2-10")}</p>
          </li>
          <li>
            <p>{t("p-2-11")}</p>
          </li>
        </ul>
        <p>{t("p-2-12")}</p>
        <p>{t("p-2-13")}</p>
        <h2 className="text-2xl mt-4">{t("heading-3")}</h2>
        <p>{t("p-3-1")}</p>
        <ul className="list-disc pl-8">
          <li>
            <p>{t("p-3-2")}</p>
          </li>
          <li>
            <p>{t("p-3-3")}</p>
          </li>
          <li>
            <p>{t("p-3-4")}</p>
          </li>
          <li>
            <p>{t("p-3-5")}</p>
          </li>
          <li>
            <p>{t("p-3-6")}</p>
          </li>
        </ul>

        <p>{t("p-3-7")}</p>
        <ul className="list-disc pl-8">
          <li>
            <p>{t("p-3-8")}</p>
          </li>
          <li>
            <p>{t("p-3-9")}</p>
          </li>
          <li>
            <p>{t("p-3-10")}</p>
          </li>
          <li>
            <p>{t("p-3-11")}</p>
          </li>
          <li>
            <p>{t("p-3-12")}</p>
          </li>
          <li>
            <p>{t("p-3-13")}</p>
          </li>
        </ul>

        <p>{t("p-3-14")}</p>
        <p>{t("p-3-15")}</p>
        <p>{t("p-3-16")}</p>
        <p>{t("p-3-17")}</p>
        <p>{t("p-3-18")}</p>
        <h3 className="text-xl mt-4">{t("heading-3-1")}</h3>
        <p>{t("p-3-1-1")}</p>
        <p>{t("p-3-1-2")}</p>
        <ul className="list-disc pl-8">
          <li>
            <p>{t("p-3-1-3")}</p>
          </li>
          <li>
            <p>{t("p-3-1-4")}</p>
          </li>
        </ul>

        <p>{t("p-3-1-5")}</p>
        <p>{t("p-3-1-6")}</p>
        <p>{t("p-3-1-7")}</p>
        <p>{t("p-3-1-8")}</p>
        <h3 className="text-xl mt-4">{t("heading-3-2")}</h3>
        <p>{t("p-3-2-1")}</p>
        <p>{t("p-3-2-2")}</p>
        <ul className="list-disc pl-8">
          <li>
            <p>{t("p-3-2-3")}</p>
          </li>
        </ul>
        <h3 className="text-xl mt-4">{t("heading-3-3")}</h3>
        <p>{t("p-3-3-1")}</p>
        <p>{t("p-3-3-2")}</p>

        <ul className="list-disc pl-8">
          <li>
            <p>{t("p-3-3-3")}</p>
          </li>
          <li>
            <p>{t("p-3-3-4")}</p>
          </li>
        </ul>
        <p>{t("p-3-3-5")}</p>
        <p>{t("p-3-3-6")}</p>
        <ul className="list-disc pl-8">
          <li>
            <p>{t("p-3-3-7")}</p>
          </li>
          <li>
            <p>{t("p-3-3-8")}</p>
          </li>
          <li>
            <p>{t("p-3-3-9")}</p>
          </li>
        </ul>
        <p>{t("p-3-3-10")}</p>
        <h3 className="text-xl mt-4">{t("heading-3-4")}</h3>
        <p>{t("p-3-4-1")}</p>
        <p>{t("p-3-4-2")}</p>
        <h2 className="text-2xl mt-4">{t("heading-4")}</h2>
        <p>{t("p-4-1")}</p>
        <p>{t("p-4-2")}</p>
        <p>{t("p-4-3")}</p>
        <p>{t("p-4-4")}</p>
        <p>{t("p-4-5")}</p>
        <ul className="list-disc pl-8">
          <li>
            <p>{t("p-4-6")}</p>
          </li>
          <li>
            <p>{t("p-4-7")}</p>
          </li>
          <li>
            <p>{t("p-4-8")}</p>
          </li>
          <li>
            <p>{t("p-4-9")}</p>
          </li>
          <li>
            <p>{t("p-4-10")}</p>
          </li>
        </ul>

        <p>{t("p-4-11")}</p>
        <h2 className="text-2xl mt-4">{t("heading-5")}</h2>
        <p>{t("p-5-1")}</p>
        <p>{t("p-5-2")}</p>
        <p>{t("p-5-3")}</p>
        <p>{t("p-5-4")}</p>
        <p>{t("p-5-5")}</p>
        <p>{t("p-5-6")}</p>
        <p>{t("p-5-7")}</p>
        <h2 className="text-2xl mt-4">{t("heading-6")}</h2>
        <p>{t("p-6-1")}</p>

        <h2 className="text-2xl mt-4">{t("heading-7")}</h2>
        <p>{t("p-7-1")}</p>
        <ul className="list-disc pl-8">
          <li>
            <p>{t("p-7-2")}</p>
          </li>
          <li>
            <p>{t("p-7-3")}</p>
          </li>
          <li>
            <p>{t("p-7-4")}</p>
          </li>
          <li>
            <p>{t("p-7-5")}</p>
          </li>
          <li>
            <p>{t("p-7-6")}</p>
          </li>
          <li>
            <p>{t("p-7-7")}</p>
          </li>
          <li>
            <p>{t("p-7-8")}</p>
          </li>
          <li>
            <p>{t("p-7-9")}</p>
          </li>
        </ul>
        <p>{t("p-7-10")}</p>
        <p>{t("p-7-11")}</p>
        <p>{t("p-7-12")}</p>
        <p>{t("p-7-13")}</p>

        <h2 className="text-2xl mt-4">{t("heading-8")}</h2>
        <p>{t("p-8-1")}</p>
        <p>{t("p-8-2")}</p>
        <p>{t("p-8-3")}</p>
        <p>{t("p-8-4")}</p>
        <p>{t("p-8-5")}</p>

        <h2 className="text-2xl mt-4">{t("heading-9")}</h2>
        <p>{t("p-9-1")}</p>
        <h2 className="text-2xl mt-4">{t("heading-10")}</h2>
        <p>{t("p-10-1")}</p>
        <h2 className="text-2xl mt-4">{t("heading-11")}</h2>
        <p>{t("p-11-1")}</p>
        <p>{t("p-11-2")}</p>
        <p className="text-right my-2">{t("p-11-3")}</p>
        <p>{t("p-11-4")}</p>
        <p>{t("p-11-5")}</p>
      </section>
    </main>
  );
}

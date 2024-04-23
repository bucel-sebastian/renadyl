import { useMessages, useTranslations } from "next-intl";
import { getTranslator } from "next-intl/server";
import Link from "next/link";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslator(locale, "Terms-and-conditions");

  return {
    title: `${t("page-title")} - Renadyl™`,
  };
}

export default function Page({ params: { locale } }) {
  let messages = useMessages();

  const t = useTranslations("Terms-and-conditions");

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
        <h2 className="text-2xl ">1. {t("heading-1")}</h2>
        <p>1.1. {t("p-1-1")}</p>
        <p>1.2. {t("p-1-2")}</p>
        <p>1.3. {t("p-1-3")}</p>

        <h2 className="text-2xl mt-4">2. {t("heading-2")}</h2>
        <p>2.1. {t("p-2-1")}</p>

        <h2 className="text-2xl mt-4">3. {t("heading-3")}</h2>
        <p>3.1. {t("p-3-1")}</p>
        <p>3.2. {t("p-3-2")}</p>

        <h2 className="text-2xl mt-4">4. {t("heading-4")}</h2>
        <p>4.1. {t("p-4-1")}</p>

        <h2 className="text-2xl mt-4">5. {t("heading-5")}</h2>
        <p>5.1. {t("p-5-1")}</p>

        <h2 className="text-2xl mt-4">6. {t("heading-6")}</h2>
        <p>6.1. {t("p-6-1")}</p>
        <p>6.2. {t("p-6-2")}</p>
        <p>6.3. {t("p-6-3")}</p>

        <h2 className="text-2xl mt-4">7. {t("heading-7")}</h2>
        <p>7.1. {t("p-7-1")}</p>

        <h2 className="text-2xl mt-4">8. {t("heading-8")}</h2>
        <p>8.1. {t("p-8-1")}</p>

        <h2 className="text-2xl mt-4">9. {t("heading-9")}</h2>
        <p>9.1. {t("p-9-1")}</p>
        <p>9.2. {t("p-9-2")}</p>
        <p>9.3. {t("p-9-3")}</p>
        <p>9.4. {t("p-9-4")}</p>

        <h2 className="text-2xl mt-4">10. {t("heading-10")}</h2>
        <p>10.1. {t("p-10-1")}</p>
        <p>{t("p-10-1-cont")}</p>
        <p>
          Email:{" "}
          <Link href="mailto:office@healthymedical.ro">
            office@healthymedical.ro
          </Link>
        </p>
        <p>{t("p-10-1-cont-1")}</p>
        <p>{t("p-10-1-cont-2")}</p>

        <h2 className="text-2xl mt-4">11. {t("heading-11")}</h2>
        <p>11.1. {t("p-11-1")}</p>

        <h2 className="text-2xl mt-4">12. {t("heading-12")}</h2>
        <p>12.1. {t("p-12-1")}</p>

        <h2 className="text-2xl mt-4">13. {t("heading-13")}</h2>
        <p>13.1. {t("p-13-1")}</p>
        <p>13.2. {t("p-13-2")}</p>
        <p>13.3. {t("p-13-3")}</p>
        <p>13.4. {t("p-13-4")}</p>
        <p>13.5. {t("p-13-5")}</p>
        <p>13.6. {t("p-13-6")}</p>

        <h2 className="text-2xl mt-4">14. {t("heading-14")}</h2>
        <p>14.1. {t("p-14-1")}</p>
        <p>14.2. {t("p-14-2")}</p>
        <p>14.3. {t("p-14-3")}</p>

        <h2 className="text-2xl mt-4">15. {t("heading-15")}</h2>
        <p>15.1. {t("p-15-1")}</p>

        <h2 className="text-2xl mt-4">16. {t("heading-16")}</h2>
        <p>16.1. {t("p-16-1")}</p>

        <h2 className="text-2xl mt-4">17. {t("heading-17")}</h2>
        <p>17.1. {t("p-17-1")}</p>
        <p>17.2. {t("p-17-2")}</p>

        <h2 className="text-2xl mt-4">18. {t("heading-18")}</h2>
        <p>18.1. {t("p-18-1")}</p>
        <p>18.2. {t("p-18-2")}</p>
        <p>18.2.1 {t("p-18-2-1")}</p>
        <p>18.2.2 {t("p-18-2-2")}</p>
        <p>18.2.3 {t("p-18-2-3")}</p>
        <p>18.2.4 {t("p-18-2-4")}</p>
        <p>18.2.4.1 {t("p-18-2-4-1")}</p>
        <p>18.2.4.2 {t("p-18-2-4-2")}</p>
        <p>18.2.4.3 {t("p-18-2-4-3")}</p>
        <p>18.2.4.4 {t("p-18-2-4-4")}</p>
        <p>18.2.4.5 {t("p-18-2-4-5")}</p>
        <p>18.2.4.6 {t("p-18-2-4-6")}</p>
        <p>18.3. {t("p-18-3")}</p>

        <h2 className="text-2xl mt-4">19. {t("heading-19")}</h2>
        <p>19.1. {t("p-19-1")}</p>

        <h2 className="text-2xl mt-4">20. {t("heading-20")}</h2>
        <p>20.1. {t("p-20-1")}</p>
        <p>20.2. {t("p-20-2")}</p>
        <p>20.3. {t("p-20-3")}</p>
        <p>20.4. {t("p-20-4")}</p>
        <p>20.5. {t("p-20-5")}</p>
        <p>20.6. {t("p-20-6")}</p>
        <p>20.7. {t("p-20-7")}</p>

        <h2 className="text-2xl mt-4">21. {t("heading-21")}</h2>
        <p>21.1. {t("p-21-1")}</p>

        <h2 className="text-2xl mt-4">22. {t("heading-22")}</h2>
        <p>22.1. {t("p-22-1")}</p>

        <h2 className="text-2xl mt-4">23. {t("heading-23")}</h2>
        <p>23.1. {t("p-23-1")}</p>
        <p>23.2. {t("p-23-2")}</p>
        <p>23.3. {t("p-23-3")}</p>
        <p>23.4. {t("p-23-4")}</p>
      </section>
    </main>
  );
}

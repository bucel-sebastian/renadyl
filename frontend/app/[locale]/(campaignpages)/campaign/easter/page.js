import { getTranslator } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslator(locale, "Campaign.easter");

  return {
    title: `${t("page-title")} - Renadyl™`,
    description: `${t("page-desc")}`,
    keywords: [
      t("page-keywords.1"),
      t("page-keywords.2"),
      t("page-keywords.3"),
    ],
  };
}

export default function Campaign() {
  return (
    <>
      <main className="w-full h-screen relative overflow-hidden"></main>
    </>
  );
}

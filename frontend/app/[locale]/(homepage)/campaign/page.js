const getCampaignData = async () => {
  const response = await fetch("/api/");
};

export default function Campaign({ params: { locale } }) {
  let messages = useMessages();

  const locales = ["ro", "en", "de"];

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();
  const t = useTranslations("Campaign");

  return <></>;
}

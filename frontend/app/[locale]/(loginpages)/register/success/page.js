import RegisterForm from "@/components/login/RegisterForm";
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";
import Link from "next-intl/link";
import { getTranslator } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslator(locale, "Register-success");

  return {
    title: `Renadyl™ -  ${t("page-title")}`,
  };
}

export default function Register({ params: { locale } }) {
  let messages = useMessages();

  const t = useTranslations("Register-success");

  const locales = ["ro", "en", "de"];

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  return (
    <main className="relative w-full h-screen flex justify-center content-center items-center ">
      <div className="bg-backgroundPrimary border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-8 px-12">
        <h2 className="text-center font-bold text-3xl">{t("heading")}</h2>
        <p className="text-center">{t("desc")}</p>
        <br />
        <Link
          href="/login"
          locale={locale}
          className="block bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-2 mx-auto"
        >
          {t("back-to-login-btn")}
        </Link>
        {/* <NextIntlClientProvider locale={locale} messages={messages}>
          <RegisterForm locale={locale} />
        </NextIntlClientProvider> */}
      </div>
    </main>
  );
}

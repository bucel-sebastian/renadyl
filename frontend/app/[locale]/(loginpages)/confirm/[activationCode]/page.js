import ConfirmAccount from "@/components/login/ConfirmAccount";
// import {
// NextIntlClientProvider,
// useMessages,
// useTranslations,
// } from "next-intl";
import { getTranslations, getTranslator } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next-intl/link";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslator(locale, "Account-confirmation");

  return {
    title: `${t("page-title")} - Renadyl™`,
  };
}

async function getActivationCodeData(activationCode) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/confirm/${activationCode}`
  );
  const activationCodeResponse = await response.json();

  return activationCodeResponse;
}

export default async function Confirm({ params: { activationCode, locale } }) {
  const t = await getTranslations("Account-confirmation");

  const locales = ["ro", "en", "de"];

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  const activationCodeResponse = await getActivationCodeData(activationCode);

  return (
    <main className="relative w-full h-screen flex justify-center content-center items-center ">
      <div className="bg-backgroundPrimary border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-8 px-12">
        <h2 className="text-center font-bold text-3xl">{t("heading")}</h2>
        {/* <p className="text-center">{t("desc")}</p> */}
        {activationCodeResponse.response === true ? (
          <>
            <p className="text-center">{t("account-activated")}</p>
          </>
        ) : (
          <>
            <p className="text-center">{t("invalid-code")}</p>
          </>
        )}
        <br />
        <Link
          href="/login"
          locale={locale}
          className="block bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-2 mx-auto"
        >
          {t("login-btn")}
        </Link>
        {/* <NextIntlClientProvider locale={locale} messages={messages}>
          <ConfirmAccount activationCode={activationCode} />
        </NextIntlClientProvider> */}
      </div>
    </main>
  );
}

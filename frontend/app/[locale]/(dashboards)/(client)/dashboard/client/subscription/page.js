import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import SessionProviderInClient from "@/components/SessionProviderInClient";

import { getServerSession } from "next-auth";
import { NextIntlClientProvider, useMessages } from "next-intl";

import { useTranslations } from "next-intl";

export default function Page({ params: { locale } }) {
  const t = useTranslations("Under-construction");

  return (
    <>
      <div className="w-full h-[300px] p-20 bg-backgroundPrimary rounded-xl shadow-xl border-foregroundPrimary10 border-[1px] max-md:px-8 max-sm:px-2 max-sm:py-10 max-sm:full">
        <h1 className="text-5xl text-center">{t("heading")}</h1>
        <p className="text-xl text-center">{t("desc")}</p>
      </div>
    </>
  );
}

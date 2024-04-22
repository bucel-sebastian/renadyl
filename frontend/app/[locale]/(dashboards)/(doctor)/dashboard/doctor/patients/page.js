import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import SessionProviderInClient from "@/components/SessionProviderInClient";
import DoctorPatientsList from "@/components/dashboard/doctor/DoctorPatientsList";
import { getServerSession } from "next-auth";
import {
  NextIntlClientProvider,
  useTranslations,
  useMessages,
} from "next-intl";

export default function Page({ params: { locale } }) {
  const session = getServerSession(authOptions);

  let messages = useMessages();

  const locales = ["ro", "en", "de"];

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  return (
    <>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <SessionProviderInClient session={session}>
          <DoctorPatientsList />
        </SessionProviderInClient>
      </NextIntlClientProvider>
    </>
  );
}

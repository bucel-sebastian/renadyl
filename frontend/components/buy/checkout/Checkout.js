import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import React from "react";
import CheckoutNotLoggedIn from "./CheckoutNotLoggedIn";
import CheckoutLoggedIn from "./CheckoutLoggedIn";
import { NextIntlClientProvider } from "next-intl";

async function Checkout({ locale, messages }) {
  const session = await getServerSession(authOptions);
  // console.log("locale si mesaje", locale, messages);

  return (
    <>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {session ? (
          <>
            <CheckoutLoggedIn locale={locale} />
          </>
        ) : (
          <>
            <CheckoutNotLoggedIn locale={locale} />
          </>
        )}
      </NextIntlClientProvider>
    </>
  );
}

export default Checkout;

import createMiddleWare from "next-intl/middleware";
import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";
import { createIntlMiddleware } from "next-intl/middleware";

// const locales = ["ro", "en", "de"];
// const publicPages = [

// ]

// const intlMiddleware = createIntlMiddleware({
//   locales,
//   defaultLocale: "ro",
//   localeDetection: false
// });

// const authMiddleware = withAuth(

//   ()
// )

export default createMiddleWare({
  locales: ["ro", "en", "de"],
  defaultLocale: "ro",
  localeDetection: false,
  // domains: [
  //     {
  //         domain: 'renadyleurope.com',
  //         defaultLocale: 'en',
  //     },
  //     {
  //         domain: 'renadyl.ro',
  //         defaultLocale: 'ro',
  //     }
  // ]
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

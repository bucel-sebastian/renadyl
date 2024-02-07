import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const locales = ["ro", "en", "de"];
const publicPages = ["/", "/login"];

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix: "as-needed",
  defaultLocale: "ro",

  localeDetection: false,
});

const adminAuthMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // console.log("Callback req- ", req);
        if (
          token?.role === "admin" &&
          !req.nextUrl.pathname.startsWith("/admin/dashboard")
        ) {
          return false;
        }
        if (token?.role === "client") {
          return false;
        }
        if (token?.role === "doctor") {
          return false;
        }
        if (token?.role === "distributor") {
          return false;
        }
        if (token?.role === "affiliate") {
          return false;
        }
        return token?.role != null;
      },
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);
const clientAuthMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: async ({ req, token }) => {
        if (token?.role === "admin") {
          return false;
        }
        if (
          token?.role === "client" &&
          !req.nextUrl.pathname.startsWith("/dashboard/client")
        ) {
          return false;
        }
        if (
          token?.role === "doctor" &&
          !req.nextUrl.pathname.startsWith("/dashboard/doctor")
        ) {
          return false;
        }
        if (
          token?.role === "distributor" &&
          !req.nextUrl.pathname.startsWith("/dashboard/distributors")
        ) {
          return false;
        }
        if (
          token?.role === "affiliate" &&
          !req.nextUrl.pathname.startsWith("/dashboard/affiliate")
        ) {
          return false;
        }
        return token?.role != null;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export default async function middleware(req) {
  const isPrivatePage =
    req.nextUrl.pathname.startsWith("/admin/dashboard") ||
    req.nextUrl.pathname.startsWith("/dashboard");

  const res = NextResponse.next();

  console.log("response", res);
  console.log("request", req);

  console.log("geo", {
    city: req.geo.city,
    country: req.geo.country,
    region: req.geo.region,
    lat: req.geo.latitude,
    lng: req.geo.longitude,
  });

  console.lop("Cookie", req.cookies.get("NEXT_LOCALE"));
  if (!req.cookies.get("NEXT_LOCALE")) {
    if (req?.geo?.country === "RO") {
      console.log("set locale cookie to RO");
      req.cookies.set("NEXT_LOCALE", "ro");
    } else {
      console.log("set locale cookie to EN");
      req.cookies.set("NEXT_LOCALE", "en");
    }
  }

  const isAdmin = req.nextUrl.pathname.startsWith("/admin/dashboard");

  const token = await getToken({
    req: req,
    secret: process.env.NEXT_AUTH_SECRET,
  });

  if (isPrivatePage) {
    if (isAdmin) {
      return await adminAuthMiddleware(req);
    } else {
      return await clientAuthMiddleware(req);
    }
  } else {
    return intlMiddleware(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

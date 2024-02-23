import { getTranslations, getTranslator } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next-intl/link";

export const dynamic = "force-dynamic";

async function getOrderDetails(orderId) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/client/data/json/orders/${orderId}`
  );
  const body = await response.json();

  return body;
}

export default async function PreviewOrder({ params: { orderId, locale } }) {
  const t = await getTranslations("Account-confirmation");

  const locales = ["ro", "en", "de"];

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  const orderDetails = await getOrderDetails(orderId);
  return (
    <main className="relative block pt-[90px] text-lg min-h-screen h-full checkout-background">
      {JSON.stringify(orderDetails, null, 4)}
    </main>
  );
}

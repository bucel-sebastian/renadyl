import { getMessages, getTranslations, getTranslator } from "next-intl/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { notFound } from "next/navigation";
import Link from "next-intl/link";
import CancelOrderBtn from "@/components/CancelOrderBtn";
import { NextIntlClientProvider } from "next-intl";

export const dynamic = "force-dynamic";

async function getOrderDetails(orderId) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/client/data/json/orders/${orderId}`
  );
  const body = await response.json();

  body.body.billing_details = JSON.parse(body.body.billing_details);
  body.body.cart = JSON.parse(body.body.cart);
  body.body.shipping_details = JSON.parse(body.body.shipping_details);
  if (body.body.shipping_awb !== null) {
    body.body.shipping_awb = JSON.parse(body.body.shipping_awb);
  }
  if (body.body?.doctor !== null) {
    body.body.doctor = body.body?.doctor;
  }
  if (body.body.payment_status !== null) {
    body.body.payment_status = JSON.parse(body.body.payment_status);
  }
  if (body.body.invoice !== null) {
    body.body.invoice = JSON.parse(body.body.invoice);
  }

  return body.body;
}

async function getIfOrderHasCancelRequest(orderId) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/client/data/json/orders/check-cancel-request/${orderId}`
  );

  const body = await response.json();
  return body.response;
}

export default async function PreviewOrder({ params: { orderId, locale } }) {
  const t = await getTranslations("Preview-order");
  console.log("locale -", locale);
  const messages = await getMessages(locale);

  const locales = ["ro", "en", "de"];

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  const orderData = await getOrderDetails(orderId);
  const orderHasCancelRequest = await getIfOrderHasCancelRequest(orderId);

  const datetimeOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat("ro-RO", datetimeOptions);

  const orderStatus = [
    { name: t("orders-list.order-status.cancelled"), color: "#e74d3d" },
    { name: t("orders-list.order-status.placed"), color: "#f1c40d" },
    { name: t("orders-list.order-status.processing"), color: "#e77e22" },
    { name: t("orders-list.order-status.ready-to-ship"), color: "#3397dc" },
    { name: t("orders-list.order-status.shipped"), color: "#2980b9" },
    { name: t("orders-list.order-status.finished"), color: "#2ecd70" },
    { name: t("orders-list.order-status.refunded"), color: "#e74d3d" },
  ];

  const statusData = {
    "status-0": t("orders-list.order-status.cancelled"),
    "status-1": t("orders-list.order-status.placed"),
    "status-2": t("orders-list.order-status.processing"),
    "status-3": t("orders-list.order-status.ready-to-ship"),
    "status-4": t("orders-list.order-status.shipped"),
    "status-5": t("orders-list.order-status.finished"),
    "status-6": t("orders-list.order-status.refunded"),
  };

  return (
    <main className="relative block pt-[90px] text-lg min-h-screen h-full checkout-background pb-12">
      <section className="block relative max-w-[1200px] w-full mx-auto z-10 max-[1200px]:px-2">
        <div className="w-full border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary mb-4 mt-4 relative z-20">
          <h1 className="text-3xl font-bold ">
            {t("title")} #{orderId}
          </h1>
          <div className="flex flex-row justify-between">
            <h2 className="text-xl font-bold">{t("order-details.title")}</h2>
          </div>
          <div>
            <div className="flex flex-row gap-8">
              <div className="w-1/2">
                <div>
                  <h4 className="font-bold">
                    {t("order-details.creation-date")}
                  </h4>
                  <p>{formatter.format(new Date(orderData?.date))}</p>
                </div>

                <div>
                  <h4 className="font-bold">{t("order-details.status")}</h4>
                  <p>{orderStatus[orderData?.status].name}</p>
                </div>
                <div>
                  <div className="flex flex-row gap-2 ">
                    <div className="w-2/3">
                      {/* <SelectInput
                          data={statusData}
                          value={newStatus}
                          name="status-selector"
                          placeholder="Status actual"
                          onChange={handleStatusInputChange}
                          required={true}
                        /> */}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold">{t("order-details.medic")}</h4>
                  <p>
                    {orderData?.doctor?.id
                      ? orderData?.doctor?.doctor_name
                      : orderData?.doctor?.client}
                  </p>
                </div>
                <br />
                <div>
                  <h4 className="font-bold">
                    {t("order-details.shipping-provider")}
                  </h4>
                  <p>
                    {orderData?.shipping_details.provider} -{" "}
                    {orderData?.shipping_details.type}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold">AWB</h4>
                  <p>
                    {orderData?.shipping_awb === null ? (
                      <>{t("order-details.awb-not-created")}</>
                    ) : (
                      <></>
                    )}
                  </p>
                </div>
              </div>
              <div className="w-1/2">
                <div>
                  <h4 className="font-bold">
                    {t("order-details.payment-type")}
                  </h4>
                  <p>{orderData?.payment}</p>
                </div>
                <div>
                  <h4 className="font-bold">
                    {t("order-details.payment-status")}
                  </h4>
                  <p>
                    {orderData?.payment_status === null ? (
                      <>{t("order-details.payment-pending")}</>
                    ) : (
                      <>
                        {orderData?.payment_status.status === "confirmed" ? (
                          <>{t("order-details.payment-confirmed")}</>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </p>
                </div>
                <div>
                  {orderData?.invoice?.reverse ? (
                    <>
                      <h4 className="font-bold">
                        {t("order-details.invoice")}
                      </h4>
                      <p>
                        <button
                          onClick={(e) =>
                            handleViewInvoice(
                              e,
                              orderData.invoice.series,
                              orderData.invoice.number
                            )
                          }
                        >
                          {orderData.invoice.series} {orderData.invoice.number}
                        </button>
                      </p>
                      <h4 className="font-bold">
                        {t("order-details.reverse-invoice")}
                      </h4>
                      <p>
                        <button
                          onClick={(e) =>
                            handleViewInvoice(
                              e,
                              orderData.invoice.reverse.series,
                              orderData.invoice.reverse.number
                            )
                          }
                        >
                          {orderData.invoice.reverse.series}{" "}
                          {orderData.invoice.reverse.number}
                        </button>
                      </p>
                    </>
                  ) : (
                    <>
                      <h4 className="font-bold">
                        {t("order-details.invoice")}
                      </h4>
                      <p>
                        {orderData?.invoice !== null ? (
                          <>
                            <button
                              onClick={(e) =>
                                handleViewInvoice(
                                  e,
                                  orderData.invoice.series,
                                  orderData.invoice.number
                                )
                              }
                            >
                              {orderData.invoice.series}{" "}
                              {orderData.invoice.number}
                            </button>
                          </>
                        ) : (
                          <>{t("order-details.invoice-not-created")}</>
                        )}
                      </p>
                    </>
                  )}
                </div>
                <br />
                <br />
                <div className="z-20">
                  {orderData.status.toString() === "0" ? (
                    <></>
                  ) : (
                    <>
                      {orderHasCancelRequest ? (
                        <p className="text-dashboardRed font-bold">
                          {t("order-details.cancel-order-sent")}
                        </p>
                      ) : (
                        <>
                          <NextIntlClientProvider
                            locale={locale}
                            messages={messages}
                          >
                            <CancelOrderBtn orderData={orderData} />
                          </NextIntlClientProvider>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 relative z-10">
          <div className="w-1/2 border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary mb-4">
            <h2 className="text-xl font-bold">{t("shipping-title")}</h2>

            <div>
              <p>
                {orderData.shipping_details.fname}{" "}
                {orderData.shipping_details.lname}
              </p>
              <p>{orderData.shipping_details.phone}</p>
              <p>{orderData.shipping_details.email}</p>
              <p>{orderData.shipping_details.address}</p>
              <p>{orderData.shipping_details.city}</p>
              <p>{orderData.shipping_details.state}</p>
              <p>{orderData.shipping_details.country}</p>
              <p>{orderData.shipping_details.postalCode}</p>
            </div>
          </div>
          <div className="w-1/2 border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary mb-4">
            <h2 className="text-xl font-bold">{t("billing-title")}</h2>
            <div>
              {orderData.billing_details.entity === "pf" ? (
                <>
                  <p>
                    {orderData.billing_details.fname}{" "}
                    {orderData.billing_details.lname}
                  </p>
                  <p>{orderData.billing_details.phone}</p>
                  <p>{orderData.billing_details.email}</p>
                  <p>{orderData.billing_details.address}</p>
                  <p>{orderData.billing_details.city}</p>
                  <p>{orderData.billing_details.state}</p>
                  <p>{orderData.billing_details.country}</p>
                  <p>{orderData.billing_details.postalCode}</p>
                </>
              ) : (
                <>
                  <p>
                    {orderData.billing_details.companyName}
                    {" - "}
                    {orderData.billing_details.companyCif}
                  </p>
                  <p>{orderData.billing_details.address}</p>
                  <p>{orderData.billing_details.city}</p>
                  <p>{orderData.billing_details.state}</p>
                  <p>{orderData.billing_details.country}</p>
                  <p>{orderData.billing_details.postalCode}</p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="w-full border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary mb-4 relative z-10">
          <h2 className="text-xl font-bold">{t("cart-details.title")}</h2>
          <Table
            sx={{
              backgroundColor: "var(--background-primary)",
              color: "var(--foreground-primary)",
            }}
          >
            <TableHead
              sx={{
                backgroundColor: "var(--background-primary)",
                color: "var(--foreground-primary)",
              }}
            >
              <TableRow
                sx={{
                  backgroundColor: "var(--background-primary)",
                  color: "var(--foreground-primary)",
                }}
              >
                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("cart-details.table-heads.product")}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("cart-details.table-heads.lot")}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("cart-details.table-heads.expire-date")}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("cart-details.table-heads.unit-price")}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("cart-details.table-heads.quantity")}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("cart-details.table-heads.total")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderData?.cart ? (
                <>
                  {orderData.cart.map((row) => (
                    <TableRow key={row.productName}>
                      <TableCell
                        sx={{
                          backgroundColor: "var(--background-primary)",
                          color: "var(--foreground-primary)",
                        }}
                      >
                        {row.productName === "renal_single"
                          ? t("renal-single-short-name")
                          : t("renal-bundle-short-name")}
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: "var(--background-primary)",
                          color: "var(--foreground-primary)",
                        }}
                      >
                        {row.lotNumber}
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: "var(--background-primary)",
                          color: "var(--foreground-primary)",
                        }}
                      >
                        {row.expDate}
                      </TableCell>

                      <TableCell
                        sx={{
                          backgroundColor: "var(--background-primary)",
                          color: "var(--foreground-primary)",
                        }}
                      >
                        {row.price} {orderData.currency}
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: "var(--background-primary)",
                          color: "var(--foreground-primary)",
                        }}
                      >
                        x{row.quantity}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          backgroundColor: "var(--background-primary)",
                          color: "var(--foreground-primary)",
                        }}
                      >
                        {row.price * row.quantity} {orderData.currency}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <></>
              )}
              {orderData?.order_total ? (
                <>
                  <TableRow>
                    <TableCell colSpan={2} align="left"></TableCell>
                    <TableCell colSpan={2} align="right">
                      <div>{t("cart-details.summary.products-total")}</div>
                      <div>{t("cart-details.summary.shipping-total")}</div>
                      {orderData.promo_total === 0 ? (
                        <></>
                      ) : (
                        <>
                          <div>{t("cart-details.summary.promocode-total")}</div>
                        </>
                      )}
                      <div className="text-xl">
                        {t("cart-details.summary.total")}
                      </div>
                      <div>{t("cart-details.summary.included-vat")}</div>
                    </TableCell>
                    <TableCell colSpan={2} align="right">
                      <div>
                        {orderData.products_total} {orderData.currency}
                      </div>
                      <div>
                        {orderData.shipping_total} {orderData.currency}
                      </div>
                      {orderData.promo_total === 0 ? (
                        <></>
                      ) : (
                        <>
                          <div>
                            -{orderData.promo_total} {orderData.currency}
                          </div>
                        </>
                      )}
                      <div className="text-xl">
                        {orderData.order_total} {orderData.currency}
                      </div>
                      <div>
                        {orderData.vat_total} {orderData.currency}
                      </div>
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  );
}

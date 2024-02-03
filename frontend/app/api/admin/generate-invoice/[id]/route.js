import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  const database = new Database();

  const ordersList = await database.select("renadyl_orders", { id: id });
  const databaseResponseInvoiceSeries = await database.select(
    "renadyl_settings",
    { name: "invoice_series" }
  );
  const orderData = await ordersList[0];
  const invoiceSeries = await databaseResponseInvoiceSeries[0].value;

  const billingDetails = JSON.parse(await orderData.billing_details);
  const shippingDetails = JSON.parse(await orderData.shipping_details);
  const cart = JSON.parse(await orderData.cart);

  const payment = orderData.payment;
  const orderTotal = orderData.order_total;
  const currency = orderData.currency === "EURO" ? "EUR" : "RON";
  const shippingAwb = orderData.shipping_awb;

  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Basic ${btoa(
      `${process.env.SMARTBILL_EMAIL}:${process.env.SMARTBILL_SECRET}`
    )}`,
  });

  const requestProducts = [];

  const requestClient =
    billingDetails.entity === "pf"
      ? {
          name: `${billingDetails.lname} ${billingDetails.fname}`,
          address: billingDetails.address,
          phone: billingDetails.phone,
          city: billingDetails.city,
          county: billingDetails.state,
          country: billingDetails.country,
          email: billingDetails.email,
          saveToDb: false,
        }
      : {
          name: billingDetails.companyName,
          vatCode: billingDetails.companyCif,
          address: billingDetails.address,
          phone: billingDetails.phone,
          city: billingDetails.city,
          county: billingDetails.state,
          country: billingDetails.country,
          email: billingDetails.email,
          saveToDb: false,
        };

  cart.forEach((item) => {
    requestProducts.push({
      name:
        orderData.country_code === "RO"
          ? item.productName === "renal_single"
            ? "Flacon Renadyl 60 capsule"
            : "Bundle 3x Flacon Renadyl 60 capsule"
          : item.productName === "renal_single"
          ? "Renadyl Bottle 60 capsules"
          : "Bundle 3x Renadyl Bottle 60 capsules",
      productDescription:
        orderData.country_code === "RO"
          ? `Lot - ${item.lotNumber}, Data expirării - ${item.expDate}`
          : `Lot - ${item.lotNumber}, Expiration date - ${item.expDate}`,
      isDiscount: false,
      measuringUnitName: orderData.country_code === "RO" ? "buc" : "pcs",
      currency: orderData.currency === "EURO" ? "EUR" : "RON",
      quantity: item.quantity,
      price: item.price,
      isTaxIncluded: true,
      taxPercentage: orderData.vat_procent,
      saveToDb: false,
      isService: false,
    });
  });

  if (orderData.shipping_total !== 0) {
    requestProducts.push({
      name: orderData.country_code === "RO" ? "Transport" : "Shipping",
      isDiscount: false,
      measuringUnitName: orderData.country_code === "RO" ? "buc" : "pcs",
      currency: orderData.currency === "EURO" ? "EUR" : "RON",
      quantity: 1,
      price: orderData.shipping_total,
      isTaxIncluded: true,
      taxPercentage: orderData.vat_procent,
      saveToDb: false,
      isService: false,
    });
  }

  if (orderData.promo_total !== 0) {
    requestProducts.push({
      name:
        orderData.country_code === "RO"
          ? `Reducere cod promoțional - ${orderData.promo_code}`
          : `Promocode sale - ${orderData.promo_code}`,
      isDiscount: true,
      measuringUnitName: orderData.country_code === "RO" ? "buc" : "pcs",
      currency: orderData.currency === "EURO" ? "EUR" : "RON",
      discountType: 1,
      discountValue: -orderData.promo_total,
      isTaxIncluded: true,
      taxPercentage: orderData.vat_procent,
    });
  }

  const requestBody = {
    companyVatCode: process.env.BUSINESS_CIF,
    client: requestClient,
    isDraft: false,
    seriesName: invoiceSeries,
    currency: orderData.currency === "EURO" ? "EUR" : "RON",
    language: orderData.country_code === "RO" ? "RO" : "EN",
    precision: 2,
    products: requestProducts,
  };
  const response = await fetch(process.env.SMARTBILL_CREATE_INVOICE_URL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(requestBody),
  });
  const responseBody = await response.json();
  console.log(responseBody);

  if (responseBody.errorText === "") {
    const newLogs = orderData.logs ? JSON.parse(orderData.logs) : [];
    newLogs.push({
      date: `${new Date().toISOString()}`,
      message: `Factura a fost generata - ${responseBody.series} ${responseBody.number} `,
    });

    const databaseUpdateResponse = await database.update(
      "renadyl_orders",
      {
        invoice: {
          number: responseBody.number,
          series: responseBody.series,
          message: responseBody.message,
          url: responseBody.url,
          date: new Date().toISOString(),
        },
        logs: JSON.stringify(newLogs),
      },
      { id: id }
    );
    if (databaseUpdateResponse.length !== 0) {
      return NextResponse.json({
        status: 200,
        body: responseBody,
      });
    }
  }
  return NextResponse.json({
    status: 401,
    body: "Eroare la crearea facturii",
  });
}

import { sendOrderToDatabase } from "@/utils/frontpages/sendOrderToDatabase";
import { sendOrderPlacedEmail } from "@/utils/nodemailer/OrderPlacedMail";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const requestBody = await req.json();

  let responseBody = {};
  try {
    const databaseResponse = await sendOrderToDatabase(requestBody);
    const { getRequest } = require("@/utils/frontpages/netopia/getPaymentData");

    console.log("db resp - ", databaseResponse[0]);
    console.log("req  - ", requestBody);

    const emailRes = await sendOrderPlacedEmail({
      lang: requestBody.locale,
      order_id: databaseResponse[0].id,
      token: databaseResponse[0].token,
      order_date: databaseResponse[0].date,
      order_total: databaseResponse[0].order_total,
      promo_total: databaseResponse[0].promo_total,
      vat_total: databaseResponse[0].vat_total,
      shipping_total: databaseResponse[0].shipping_total,
      products_total: databaseResponse[0].products_total,
      shipping: JSON.parse(databaseResponse[0].shipping_details),
      client_id: databaseResponse[0].client_id,
      // client_id: "client2081745488",
      currency: databaseResponse[0].currency,
      cart: JSON.parse(databaseResponse[0].cart),
    });

    const getPaymentData = await getRequest(
      databaseResponse[0].id,
      databaseResponse[0].order_total,
      databaseResponse[0].currency,
      requestBody,
      requestBody.locale
    );

    responseBody = {
      databaseResponse: await databaseResponse,
      paymentType: requestBody.checkoutData.payment,
      paymentData: await getPaymentData,
      emailRes: emailRes,
    };
  } catch (error) {
    console.error("Eroare - ", error);
  }

  return NextResponse.json({
    status: 200,
    body: responseBody,
  });
}

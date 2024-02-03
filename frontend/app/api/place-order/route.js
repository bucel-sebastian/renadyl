import { sendOrderToDatabase } from "@/utils/frontpages/sendOrderToDatabase";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const requestBody = await req.json();

  let responseBody = {};
  try {
    const databaseResponse = await sendOrderToDatabase(requestBody);
    const { getRequest } = require("@/utils/frontpages/netopia/getPaymentData");

    const getPaymentData = await getRequest(
      databaseResponse[0].id,
      databaseResponse[0].order_total,
      databaseResponse[0].currency,
      requestBody,
      requestBody.locale
    );

    responseBody = {
      databaseResponse: await databaseResponse,
      paymentData: await getPaymentData,
    };
  } catch (error) {
    console.error("Eroare - ", error);
  }

  return NextResponse.json({
    status: 200,
    body: responseBody,
  });
}
export async function GET(req, res) {
  return NextResponse.json({
    status: 200,
    body: "GET Method works!",
  });
}

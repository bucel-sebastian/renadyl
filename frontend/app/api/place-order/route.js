import { sendOrderToDatabase } from "@/utils/frontpages/sendOrderToDatabase";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const formData = await req.json();

  const responseData = new Object();
  try {
    const databaseResponse = await sendOrderToDatabase(formData);
    const { getRequest } = require("@/utils/frontpages/netopia/getPaymentData");

    const getPaymentData = await getRequest(
      databaseResponse[0].id,
      databaseResponse[0].order_total,
      databaseResponse[0].currency,
      formData
    );

    responseData["databaseResponse"] = await databaseResponse;
    responseData["paymentData"] = await getPaymentData;
  } catch (error) {
    console.error("Eroare - ", error);
  }

  return NextResponse.json({
    status: 200,
    body: responseData,
  });
}
export async function GET(req, res) {
  return NextResponse.json({
    status: 200,
    body: "GET Method works!",
  });
}

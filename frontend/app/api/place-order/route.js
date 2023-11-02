import { sendOrderToDatabase } from "@/utils/frontpages/sendOrderToDatabase";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const formData = await req.json();

  const responseData = new Object();
  try {
    const databaseResponse = await sendOrderToDatabase(formData);
    const { getRequest } = require("@/utils/frontpages/netopia/getPaymentData");
    const getPaymentData = await getRequest(111);

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

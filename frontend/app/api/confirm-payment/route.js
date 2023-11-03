import { NextResponse } from "next/server";

export async function POST(req, res) {
  const paymentData = await req;

  try {
    const {
      decodeResponse,
    } = require("@/utils/frontpages/netopia/getPaymentData");
    const decodedPaymentData = await decodeResponse(paymentData);
    console.log(decodedPaymentData);
  } catch (error) {}

  return NextResponse.json({
    status: 200,
    body: "ok",
  });
}

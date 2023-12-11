import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const database = new Database();
  const paymentData = await req;

  try {
    console.log("data JSON - ", await paymentData.text());
    const {
      decodeResponse,
    } = require("@/utils/frontpages/netopia/getPaymentData");
    const decodedPaymentData = await decodeResponse(paymentData);
    console.log(decodedPaymentData);

    database.update(
      "renadyl_orders",
      { payment_status: paymentData },
      { id: "order00001" }
    );
  } catch (error) {
    console.log("ERROR - ", error);
  }

  return NextResponse.json({
    status: 200,
    body: "ok",
  });
}

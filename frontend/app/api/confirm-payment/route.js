import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const database = new Database();

  const reqData = await req.text();
  const reqParams = new URLSearchParams(reqData);
  try {
    const paymentData = {
      env_key: reqParams.get("env_key"),
      data: reqParams.get("data"),
      cipher: reqParams.get("cipher"),
    };
    console.log("data JSON - ", paymentData);
    const {
      decodeResponse,
    } = require("@/utils/frontpages/netopia/getPaymentData");
    const decodedPaymentData = await decodeResponse(paymentData);
    console.log("decoded data - ", decodedPaymentData);

    database.update(
      "renadyl_orders",
      {
        payment_status: {
          status: decodedPaymentData.order.mobilpay.action,
          timestamp: decodedPaymentData.order["$"].timestamp,
        },
      },
      { id: decodedPaymentData.order["$"].id }
    );
  } catch (error) {
    console.log("ERROR - ", error);
  }

  return NextResponse.json({
    status: 200,
    body: "ok",
  });
}

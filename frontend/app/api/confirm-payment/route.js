export const dynamic = "force-dynamic";

import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const database = new Database();

  console.log("Accesare confirm payment");

  const reqData = await req.text();

  console.log("request data - ", reqData);

  // const reqParams = new URLSearchParams(reqData);
  // try {
  //   const paymentData = {
  //     env_key: reqParams.get("env_key"),
  //     data: reqParams.get("data"),
  //     cipher: reqParams.get("cipher"),
  //   };

  //   console.log("payment data", paymentData);
  //   const {
  //     decodeResponse,
  //   } = require("@/utils/frontpages/netopia/getPaymentData");
  //   const decodedPaymentData = await decodeResponse(paymentData);

  //   console.log("decodde paymetn data", decodedPaymentData);
  //   console.log("Id", decodedPaymentData.order["$"].id);
  //   await database.update(
  //     "renadyl_orders",
  //     {
  //       payment_status: {
  //         status: decodedPaymentData.order.mobilpay.action,
  //         timestamp: decodedPaymentData.order["$"].timestamp,
  //       },
  //     },
  //     { id: decodedPaymentData.order["$"].id }
  //   );
  // } catch (error) {
  //   console.log("ERROR - ", error);
  // }

  return NextResponse.json({
    status: 200,
    body: "Accesare confirm payment",
  });
}

export async function GET(req, res) {
  console.log("Getting a get request from confirm payment");
  return NextResponse.json({
    status: 200,
    body: "ok",
  });
}

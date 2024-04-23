export const dynamic = "force-dynamic";

import { confirmPayment } from "@/utils/frontpages/netopia/confirmPayment";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const reqData = await req.text();

  const response = await confirmPayment(reqData);

  console.log("Confirm payment db response - ", response);

  return NextResponse.json({
    status: 200,
    body: "Recived",
  });
}
export async function GET(req, res) {
  console.log("Request confirm GET");
  return NextResponse.json({
    status: 200,
    body: "Accesare confirm payment GET",
  });
}

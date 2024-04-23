export const dynamic = "force-dynamic";

import { confirmPayment } from "@/utils/frontpages/netopia/confirmPayment";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  console.log("Request confirm post");

  const reqData = await req.text();

  const response = await confirmPayment(reqData);

  return NextResponse.json({
    status: 200,
    body: "Accesare confirm payment NEW",
  });
}
export async function GET(req, res) {
  console.log("Request confirm GET");
  return NextResponse.json({
    status: 200,
    body: "Accesare confirm payment GET NEW",
  });
}

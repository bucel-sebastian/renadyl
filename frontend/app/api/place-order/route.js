import { sendOrderToDatabase } from "@/utils/frontpages/sendOrderToDatabase";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const formData = await req.json();

  console.log(JSON.stringify(formData, undefined, 4));
  const paymentData = sendOrderToDatabase(formData);

  return NextResponse.json({
    status: 200,
    body: paymentData,
  });
}

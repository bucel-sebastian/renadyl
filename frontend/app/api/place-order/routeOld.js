import { sendOrderToDatabase } from "@/utils/frontpages/sendOrderToDatabase";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const formData = await req.json();
  console.log("works?");
  console.log(JSON.stringify(formData, undefined, 4));
  // const paymentData = await sendOrderToDatabase(formData);

  // console.log("payment data - ", paymentData);

  return NextResponse.json({
    status: 200,
    body: "MERGE",
  });
}

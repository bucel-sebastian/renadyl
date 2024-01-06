import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { series, number } = params;

  return NextResponse.json({
    status: 200,
    body: {
      businessCif: process.env.BUSINESS_CIF,
      series: series,
      number: number,
      auth: `Basic ${btoa(
        `${process.env.SMARTBILL_EMAIL}:${process.env.SMARTBILL_SECRET}`
      )}`,
    },
  });
}

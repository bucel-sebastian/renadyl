import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { series, number } = params;

  return NextResponse.json({
    status: 200,
    body: {
      url: `https://ws.smartbill.ro/SBORO/api/invoice/pdf?cif=${process.env.BUSINESS_CIF}&seriesname=${series}&number=${number}`,
      headers: {
        "Content-Type": "application/xml",
        Accept: "application/octet-stream",
        Accept: "application/xml",
        Authorization: `Basic ${btoa(
          `${process.env.SMARTBILL_EMAIL}:${process.env.SMARTBILL_SECRET}`
        )}`,
        "Content-Disposition": `attachment; filename="${series}${number}.pdf"`,
      },
    },
  });
}

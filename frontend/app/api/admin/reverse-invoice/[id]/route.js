import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  const database = new Database();

  const ordersList = await database.select("renadyl_orders", { id: id });
  const orderData = await ordersList[0];

  const invoiceData = JSON.parse(orderData?.invoice);

  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Basic ${btoa(
      `${process.env.SMARTBILL_EMAIL}:${process.env.SMARTBILL_SECRET}`
    )}`,
  });

  const requestBody = {
    companyVatCode: process.env.BUSINESS_CIF,
    seriesName: invoiceData.series,
    number: invoiceData.number,
    issueDate: `${new Date(invoiceData.date).getFullYear()}-${
      new Date(invoiceData.date).getMonth() + 1
    }-${new Date(invoiceData.date).getDate()}`,
  };

  const response = await fetch(process.env.SMARTBILL_REVERSE_INVOICE_URL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(requestBody),
  });

  if (response.ok) {
    const responseBody = await response.json();

    const newLogs = orderData.logs ? JSON.parse(orderData.logs) : [];
    newLogs.push({
      date: `${new Date().toISOString()}`,
      message: `Factura de stornare a fost generata - ${responseBody.series} ${responseBody.number} `,
    });

    const databaseUpdateResponse = await database.update(
      "renadyl_orders",
      {
        invoice: {
          number: invoiceData.number,
          series: invoiceData.series,
          message: invoiceData.message,
          url: invoiceData.url,
          date: invoiceData.date,
          reverse: {
            number: responseBody.number,
            series: responseBody.series,
            message: responseBody.message,
            url: responseBody.url,
            date: new Date().toISOString(),
          },
        },
        logs: JSON.stringify(newLogs),
      },
      { id: id }
    );
    if (databaseUpdateResponse.length !== 0) {
      return NextResponse.json({
        status: 200,
        body: responseBody,
      });
    }
  }

  return NextResponse.json({
    status: 401,
    body: "Eroare la crearea facturii",
  });
}

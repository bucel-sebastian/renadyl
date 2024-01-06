import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { id } = params;
  const requestBody = await req.json();

  const database = new Database();

  for (let i = 0; i < requestBody.length; i++) {
    console.log(requestBody[i]);
    console.log(
      await database.select("renadyl_lots", {
        lot_number: requestBody[i].lotNumber,
      })
    );
    const databaseResponse = await database.select("renadyl_lots", {
      lot_number: requestBody[i].lotNumber,
    });
    if (databaseResponse.length === 0) {
      database.insert("renadyl_lots", {
        lot_number: requestBody[i].lotNumber,
        exp_date: requestBody[i].expDate,
        added_date: new Date().toISOString(),
      });
    }
  }

  let responseBody = await database.update(
    "renadyl_orders",
    { cart: JSON.stringify(requestBody) },
    { id: id }
  );

  return NextResponse.json({
    status: 200,
    body: responseBody,
  });
}

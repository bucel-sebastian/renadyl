import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const requestBody = await req.json();

  const database = new Database();

  const insertValues = { ...requestBody, date: new Date().toISOString() };

  const databaseResponse = await database.insert(
    "renadyl_product_inputs",
    insertValues
  );

  if (databaseResponse.length !== 0) {
    return NextResponse.json({
      status: 200,
      response: true,
    });
  } else {
    return NextResponse.json({
      status: 200,
      response: false,
      error: "database",
    });
  }
}

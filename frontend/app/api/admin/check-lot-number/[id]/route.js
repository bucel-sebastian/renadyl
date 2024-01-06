import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  const database = new Database();

  let responseBody = await database.select("renadyl_lots", {
    lot_number: id,
  });

  if (responseBody.length === 0) {
    return NextResponse.json({
      status: 200,
      body: null,
    });
  }
  return NextResponse.json({
    status: 200,
    body: responseBody,
  });
}

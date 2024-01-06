import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const database = new Database();

  let data = null;

  try {
    data = await database.select("renadyl_orders", [], "date desc");
  } catch (error) {
    console.error(`Error - ${error}`);
  }
  return NextResponse.json({
    status: 200,
    body: data,
  });
}

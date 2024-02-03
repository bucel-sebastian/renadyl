import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const database = new Database();

  const databaseResponse = await database.query(`SELECT *
  FROM renadyl_orders
  WHERE 
    status = '5' AND
    date >= DATE_TRUNC('MONTH', CURRENT_DATE) - INTERVAL '6 months'`);

  return NextResponse.json({
    status: 200,
    body: databaseResponse,
  });
}

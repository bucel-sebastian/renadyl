import Database from "@/utils/Database";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const database = new Database();

  const data = await database.select(
    "renadyl_request_cancel_order",
    [],
    "date desc"
  );

  return NextResponse.json({
    status: 200,
    body: data,
  });
}

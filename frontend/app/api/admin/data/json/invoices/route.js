import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const database = new Database();

  let data = null;

  try {
    data = await database.query(
      `SELECT * FROM renadyl_orders WHERE invoice IS NOT NULL`,
      []
    );
    console.log("result", data);
  } catch (error) {
    console.error(`Error - ${error}`);
  }

  return NextResponse.json({
    status: 200,
    body: data,
  });
}

import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { clientId } = params;
  console.log("accesat - ", clientId);
  const database = new Database();

  let data = null;

  try {
    data = await database.query(
      `SELECT * FROM renadyl_orders WHERE client_id = $1 AND invoice IS NOT NULL`,
      [clientId]
    );
    console.log(
      "db query - ",
      `SELECT * FROM renadyl_orders WHERE client_id = $1 AND invoice IS NOT NULL ORDER BY date DESC`
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

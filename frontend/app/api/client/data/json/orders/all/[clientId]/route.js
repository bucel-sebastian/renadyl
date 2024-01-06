import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { clientId } = params;
  console.log("accesat - ", clientId);
  const database = new Database();

  let data = null;

  try {
    data = await database.select(
      "renadyl_orders",
      { client_id: clientId },
      "date desc"
    );
  } catch (error) {
    console.error(`Error - ${error}`);
  }

  console.log("db data - ", data);
  return NextResponse.json({
    status: 200,
    body: data,
  });
}

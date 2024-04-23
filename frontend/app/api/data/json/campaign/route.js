import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const database = new Database();
  let responseData = null;

  try {
    responseData = await database.select("renadyl_settings", {
      name: "promotion_landing_page",
    });
  } catch (error) {
    console.error(`Error - ${error}`);
  } finally {
    database.pool.end();
  }

  return NextResponse.json(responseData[0], {
    status: 200,
  });
}

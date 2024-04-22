import Database from "@/utils/Database";
import { getProductData } from "@/utils/frontpages/getProductData";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const database = new Database();

  let responseData = null;

  try {
    responseData = await database.select("renadyl_settings", {
      name: "stop_sales",
    });
  } catch (error) {
    console.error(`Error - ${error}`);
  } finally {
    database.pool.end();
  }

  return NextResponse.json({
    status: 200,
    body: {
      shopStatus: responseData[0].value,
    },
  });
}

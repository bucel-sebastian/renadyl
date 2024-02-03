import Database from "@/utils/Database";
import { getProductData } from "@/utils/frontpages/getProductData";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const database = new Database();

  const data = await database.select("renadyl_product_inputs", [], "date desc");

  return NextResponse.json({
    status: 200,
    body: data,
  });
}

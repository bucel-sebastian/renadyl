import Database from "@/utils/Database";
import { getProductData } from "@/utils/admin/getProductData";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { productName } = params;

  const database = new Database();

  console.log("productName - ", productName);

  const data = await database.select("renadyl_products_data", {
    product_name: productName,
  });

  if (data.length !== 0) {
    return NextResponse.json({
      status: 200,
      body: data[0],
    });
  } else {
    return NextResponse.json({
      status: 402,
      body: null,
    });
  }
}

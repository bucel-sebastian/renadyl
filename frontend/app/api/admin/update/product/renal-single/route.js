import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const requestBody = await req.json();

  const database = new Database();

  requestBody.change_date = new Date().toISOString();

  delete requestBody.id;
  delete requestBody.product_name;

  requestBody.sale_price.int = requestBody.on_sale.int
    ? requestBody.sale_percentage.int
      ? requestBody.price.int -
        (requestBody.price.int * requestBody.sale_value.int) / 100
      : requestBody.price.int - requestBody.sale_value.int
    : requestBody.price.int;

  requestBody.sale_price.nat = requestBody.on_sale.nat
    ? requestBody.sale_percentage.nat
      ? requestBody.price.nat -
        (requestBody.price.nat * requestBody.sale_value.nat) / 100
      : requestBody.price.nat - requestBody.sale_value.nat
    : requestBody.price.nat;

  const databaseResponse = await database.update(
    "renadyl_products_data",
    requestBody,
    { product_name: "renal_single" }
  );

  if (databaseResponse.length !== 0) {
    return NextResponse.json({
      status: 200,
      response: true,
      body: databaseResponse[0],
    });
  } else {
    return NextResponse.json({
      status: 200,
      response: false,
    });
  }
}

import { getProductData } from "@/utils/frontpages/getProductData";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const dataZone = params.countryCode === "RO" ? "nat" : "int";

  const productName = params.productName;

  let data = null;
  let responseData = null;
  try {
    data = await getProductData(productName);
    data = data[0];
    responseData = {
      product_name: data.product_name,
      price: data.price[dataZone],
      on_sale: data.on_sale[dataZone],
      sale_value: data.sale_value[dataZone],
      sale_price: data.sale_price[dataZone],
      sale_percentage: data.sale_percentage[dataZone],
      currency: dataZone === "nat" ? "RON" : "EURO",
    };
  } catch (error) {
    console.error(`Error - ${error}`);
  }
  return NextResponse.json({
    status: 200,
    body: responseData,
  });
}

import { getProductData } from "@/utils/frontpages/getProductData";
import { NextResponse } from "next/server";

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
      price: JSON.parse(data.price)[dataZone],
      on_sale: JSON.parse(data.on_sale)[dataZone],
      sale_value: JSON.parse(data.sale_value)[dataZone],
      sale_price: JSON.parse(data.sale_price)[dataZone],
      sale_percentage: JSON.parse(data.sale_percentage)[dataZone],
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

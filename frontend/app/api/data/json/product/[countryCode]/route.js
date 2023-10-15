import { getProductData } from "@/utils/frontpages/getProductData";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const countryCode = params.countryCode === "RO" ? params.countryCode : "*";

  console.log("Cod country - ", countryCode);

  let data = null;

  try {
    data = await getProductData(countryCode);
  } catch (error) {
    console.error(`Error - ${error}`);
  }
  return NextResponse.json({
    status: 200,
    body: data,
  });
}

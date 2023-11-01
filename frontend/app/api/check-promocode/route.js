import { checkPromocode } from "@/utils/frontpages/checkPromocode";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const formData = await req.json();

  console.log(formData);

  let response;

  try {
    response = await checkPromocode(formData);
  } catch (error) {
    console.log(`Error - ${error}`);

    return NextResponse.json({
      status: 300,
      body: error,
    });
  }

  if (response.length > 0) {
    return NextResponse.json({
      status: 200,
      body: response,
    });
  } else {
    return NextResponse.json({
      status: 200,
      body: null,
    });
  }
}

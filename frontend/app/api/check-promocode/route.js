import { checkPromocode } from "@/utils/frontpages/checkPromocode";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const formData = await req.json();

  console.log("checkpromocode", formData);

  let response = null;

  try {
    response = await checkPromocode(formData);
    console.log(response);
  } catch (error) {
    console.log(`Error - ${error}`);

    return NextResponse.json({
      status: 300,
      body: error,
    });
  }

  if (response !== null) {
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

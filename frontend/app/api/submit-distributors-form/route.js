import { saveDistributorFormToDatabase } from "@/utils/frontpages/serverUtils";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const formData = await req.json();
  delete formData.gdpr;

  console.log(formData);

  try {
    await saveDistributorFormToDatabase(formData);
  } catch (error) {
    console.error(`Error - ${error}`);

    return NextResponse.json({
      status: 200,
      body: "fail",
    });
  }

  return NextResponse.json({
    status: 200,
    body: "success",
  });
}

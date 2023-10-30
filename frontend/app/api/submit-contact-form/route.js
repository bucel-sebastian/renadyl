import {
  saveContactFormToDatabase,
  sendContactFormEmail,
} from "@/utils/frontpages/serverUtils";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const formData = await req.json();
  delete formData.gdpr;

  try {
    await saveContactFormToDatabase(formData);
    await sendContactFormEmail(formData);
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

// export async function GET() {

// }

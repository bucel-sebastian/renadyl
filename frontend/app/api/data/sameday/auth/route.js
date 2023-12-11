import { authSameday } from "@/utils/sameday/authSameday";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  let responseData = await authSameday();

  console.log(
    "Sameday auth BACKEND ",
    process.env.NEXT_PUBLIC_SAMEDAY_API_USERNAME,
    process.env.NEXT_PUBLIC_SAMEDAY_API_PASSWORD,
    process.env.NEXT_PUBLIC_SAMEDAY_API_AUTH_URL,
    process.env.NEXT_PUBLIC_SAMEDAY_EASYBOX_PLUGIN_CLIENTID
  );

  return NextResponse.json({
    status: 200,
    body: responseData,
  });
}

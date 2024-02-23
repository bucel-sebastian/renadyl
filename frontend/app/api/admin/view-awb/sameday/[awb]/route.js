import { authSameday } from "@/utils/sameday/authSameday";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { awb } = params;
  const token = await authSameday();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SAMEDAY_API_DOWNLOAD_AWB_URL}/${awb}`,
    {
      method: "GET",
      headers: {
        "X-AUTH-TOKEN": token,
      },
    }
  );

  const body = await response.blob();

  console.log("blob", body);

  return NextResponse.json({
    status: 200,
    body: body,
    token: token,
  });
}

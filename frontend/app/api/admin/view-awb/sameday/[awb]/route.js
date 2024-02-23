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
  const buffer = await blob.arrayBuffer();
  const fileType = blob.type;
  const fileName = `${awb}.pdf`;

  console.log("blob", body);

  return new Response(buffer, {
    status: 200,
    headers: {
      "Content-Type": fileType,
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
}

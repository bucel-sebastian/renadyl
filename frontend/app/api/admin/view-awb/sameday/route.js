import { authSameday } from "@/utils/sameday/authSameday";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  return NextResponse.json({
    status: 200,
    token: await authSameday(),
  });
}

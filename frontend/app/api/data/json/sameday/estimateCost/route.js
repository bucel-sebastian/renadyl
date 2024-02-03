import { estimateSamedayCost } from "@/utils/sameday/estimateSamedayCost";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  let data = null;

  try {
    data = await estimateSamedayCost(params);
  } catch (error) {
    console.error(`Error - ${error}`);
  }

  return NextResponse.json({
    status: 200,
    body: data,
  });
}

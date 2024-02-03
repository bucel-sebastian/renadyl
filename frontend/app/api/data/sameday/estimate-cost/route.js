import { estimateSamedayCost } from "@/utils/sameday/estimateSamedayCost";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const { searchParams } = new URL(req.url);
  // console.log("payment meth ", searchParams);
  let responseData = await estimateSamedayCost(searchParams);

  try {
  } catch (error) {}

  return NextResponse.json({ status: 200, body: responseData });
}

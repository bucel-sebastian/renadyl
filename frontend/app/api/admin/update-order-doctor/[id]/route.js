import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { id } = params;
  const requestBody = await req.json();

  const database = new Database();
  const responseBody = await database.update(
    "renadyl_orders",
    { doctor: requestBody },
    { id: id }
  );

  if (responseBody.length !== 0) {
    return NextResponse.json({
      status: 200,
      response: true,
    });
  } else {
    return NextResponse.json({
      status: 200,
      response: false,
    });
  }
}

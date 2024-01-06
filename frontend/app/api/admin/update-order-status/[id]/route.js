import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { id } = params;
  const requestBody = await req.json();

  const database = new Database();
  let responseBody = await database.update(
    "renadyl_orders",
    { status: requestBody.newStatus },
    { id: id }
  );

  return NextResponse.json({
    status: 200,
    body: responseBody,
  });
}

import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { userId, id } = params;

  const database = new Database();

  const databaseResponse = await database.remove("renadyl_billing_details", {
    id: id,
    client_id: userId,
  });

  if (databaseResponse.length !== 0) {
    return NextResponse.json({
      status: 200,
      response: true,
    });
  } else {
    return NextResponse.json({
      status: 200,
      body: false,
    });
  }
}

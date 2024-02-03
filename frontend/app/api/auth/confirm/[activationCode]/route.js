import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { activationCode } = params;

  const database = new Database();

  const databaseResponse = await database.update(
    "renadyl_users",
    { status: 1, activation_code: null },
    { activation_code: activationCode }
  );

  if (databaseResponse.length !== 0) {
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

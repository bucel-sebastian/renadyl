import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { email } = params;

  const database = new Database();

  const databaseResponse = await database.select("renadyl_users", {
    email: email,
  });

  if (databaseResponse.length === 0) {
    return NextResponse.json({
      status: 200,
      body: false,
    });
  } else {
    return NextResponse.json({
      status: 200,
      body: true,
    });
  }
}

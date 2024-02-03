import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id, newStatus } = params;

  const database = new Database();

  const databaseResponse = await database.update(
    "renadyl_users",
    { status: newStatus },
    { id: id }
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

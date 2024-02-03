import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const database = new Database();

  let data = null;

  data = await database.select("renadyl_admins", {});

  for (let i = 0; i < data.length; i++) {
    delete data[i].password;
  }

  return NextResponse.json({
    status: 200,
    body: data,
  });
}

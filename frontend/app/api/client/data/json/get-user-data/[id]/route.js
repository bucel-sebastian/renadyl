import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  const database = new Database();

  const userData = await database.select("renadyl_users", {
    id: id,
  });

  if (userData.length !== 0) {
    delete userData[0].password;
    return NextResponse.json({
      status: 200,
      body: userData[0],
    });
  } else {
    return NextResponse.json({
      status: 200,
      body: null,
    });
  }
}

import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const database = new Database();

  const reqData = await req.json();

  const updateRes = await database.update(
    "renadyl_users",
    {
      f_name: reqData.f_name,
      l_name: reqData.l_name,
      email: reqData.email,
      phone: reqData.phone,
    },
    {
      id: reqData.id,
    }
  );

  if (updateRes.length !== 0) {
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

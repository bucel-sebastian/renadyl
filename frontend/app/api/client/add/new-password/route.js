import Database from "@/utils/Database";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const database = new Database();

  const reqData = await req.json();

  if (reqData.password.toString() === reqData.rePassword.toString()) {
    const hashedPassword = await hash(reqData.password, 10);

    const updateRes = await database.update(
      "renadyl_users",
      { password: hashedPassword },
      { id: reqData.userId }
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
  } else {
    return NextResponse.json({
      status: 200,
      response: false,
    });
  }
}

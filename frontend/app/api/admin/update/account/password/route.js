import Database from "@/utils/Database";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const requestBody = await req.json();

  console.log(requestBody);

  if (requestBody.password.toString() === requestBody.re_password.toString()) {
    const hashedPassword = await hash(requestBody.password, 10);

    const updateRes = await database.update(
      "renadyl_admins",
      { password: hashedPassword },
      { id: requestBody.userId }
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

import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const requestBody = await req.json();

  const database = new Database();

  const responseBody = await database.update(
    "renadyl_admins",
    {
      f_name: requestBody.f_name,
      l_name: requestBody.l_name,
      email: requestBody.email,
      phone: requestBody.phone,
    },
    { id: requestBody.id }
  );

  if (responseBody.length !== 0) {
    return NextResponse.json({
      status: 200,
      response: true,
      body: {
        f_name: responseBody[0].f_name,
        l_name: responseBody[0].l_name,
        email: responseBody[0].email,
        phone: responseBody[0].phone,
      },
    });
  } else {
    return NextResponse.json({
      status: 200,
      response: false,
    });
  }
}

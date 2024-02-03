import Database from "@/utils/Database";
import { handleRegister } from "@/utils/user/auth/register";
import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.json();

  let registerRes = null;

  try {
    registerRes = await handleRegister(formData);
  } catch (e) {
    console.error(`Error - ${e}`);
  }

  if (registerRes.status) {
    return NextResponse.json({
      status: 200,
      body: registerRes,
    });
  }
}

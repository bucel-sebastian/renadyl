import Database from "@/utils/Database";
import { sendNewAccountEmail } from "@/utils/nodemailer/NewAccountMail";
import { handleRegister } from "@/utils/user/auth/register";
import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.json();

  let registerRes = null;

  // const emailRes = await sendNewAccountEmail({
  //   sendTo: formData.email,
  //   lang: "RO",
  // });

  try {
    registerRes = await handleRegister(formData);
  } catch (e) {
    console.error(`Error - ${e}`);
  }

  if (registerRes.status) {
    return NextResponse.json({
      status: 200,
      body: emailRes,
    });
  }
}

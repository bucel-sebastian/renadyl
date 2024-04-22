import Database from "@/utils/Database";
import { sendNewAccountEmail } from "@/utils/nodemailer/NewAccountMail";
import { handleRegister } from "@/utils/user/auth/register";
import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.json();

  const lang = formData.lang;
  delete formData.lang;

  let registerRes = null;

  const emailRes = await sendNewAccountEmail({
    email: "bucel.ionsebastian@gmail.com",
    activation_code: "123",
    lang: "ro",
  });

  try {
    registerRes = await handleRegister(formData);
  } catch (e) {
    console.error(`Error - ${e}`);
  }

  if (registerRes.status) {
    const emailRes = await sendNewAccountEmail({
      email: registerRes.insert.email,
      activation_code: registerRes.insert.activation_code,
      lang: lang,
    });
    return NextResponse.json({
      status: 200,
      body: registerRes,
    });
  }
}

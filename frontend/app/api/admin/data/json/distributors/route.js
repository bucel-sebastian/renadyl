import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const database = new Database();

  let data = null;

  try {
    data = await database.select(
      "renadyl_users",
      { role: "distributor" },
      "l_name asc"
    );
  } catch (error) {
    console.error(`Error - ${error}`);
  }

  for (let i = 0; i < data.length; i++) {
    delete data[i].password;
    delete data[i].activation_code;
    delete data[i].last_login;
    delete data[i].register_date;
  }
  return NextResponse.json({
    status: 200,
    body: data,
  });
}

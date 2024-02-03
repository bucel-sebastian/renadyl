import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const database = new Database();

  let data = null;

  data = await database.select(
    "renadyl_users",
    { role: "doctor" },
    "l_name asc"
  );

  for (let i = 0; i < data.length; i++) {
    delete data[i].password;
    delete data[i].activation_code;
    delete data[i].last_login;
    delete data[i].register_date;

    const accountStatus = await database.query(
      "SELECT doctor_status FROM renadyl_doctor_details WHERE doctor_id = $1",
      [data[i].id]
    );
    data[i].doctor_status = accountStatus[0].doctor_status;

    const countOrders = await database.query(
      "SELECT COUNT(*) FROM renadyl_orders WHERE doctor->>'id' = $1",
      [data[i].id]
    );
    data[i].orders = countOrders[0].count;
  }
  return NextResponse.json({
    status: 200,
    body: data,
  });
}

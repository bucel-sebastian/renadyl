import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  const database = new Database();

  const doctorData = await database.select(
    "renadyl_users",
    { id: id },
    "l_name asc"
  );

  delete doctorData[0].password;
  delete doctorData[0].activation_code;
  delete doctorData[0].last_login;
  delete doctorData[0].register_date;

  const doctorPromocode = await database.select("renadyl_promo_codes", {
    user_id: id,
  });

  const promocode =
    doctorPromocode.length === 0 ? null : doctorPromocode[0]?.code;

  let doctorOrders = [];

  if (promocode === null) {
    doctorOrders = await database.query(
      "SELECT * FROM renadyl_orders WHERE doctor->>'id' = $1 ORDER BY date desc",
      [id]
    );
  } else {
    doctorOrders = await database.query(
      "SELECT * FROM renadyl_orders WHERE doctor->>'id' = $1 OR promo_code = $2 ORDER BY date desc",
      [id, promocode]
    );
  }

  const accountDetails = await database.query(
    "SELECT * FROM renadyl_doctor_details WHERE doctor_id = $1",
    [id]
  );

  return NextResponse.json({
    status: 200,
    response: true,
    doctorData: doctorData[0],
    accountDetails: accountDetails[0],
    doctorOrders: doctorOrders,
    doctorPromocode: doctorPromocode[0],
  });
}

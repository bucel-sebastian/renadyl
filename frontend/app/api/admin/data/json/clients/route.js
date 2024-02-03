import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const database = new Database();

  let data = null;

  data = await database.select(
    "renadyl_users",
    { role: "client" },
    "register_date desc"
  );
  for (let i = 0; i < data.length; i++) {
    delete data[i].password;

    const clientOrders = await database.query(
      `SELECT COUNT(*) FROM renadyl_orders WHERE client_id = $1 AND status != '0'`,
      [data[i].id]
    );
    data[i].orders = clientOrders[0].count;
  }

  return NextResponse.json({
    status: 200,
    body: data,
  });
}

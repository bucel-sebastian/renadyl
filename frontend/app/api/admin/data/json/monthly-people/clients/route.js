import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const database = new Database();

  const data = new Object();

  const countAllClients = await database.query(
    `SELECT COUNT(*) FROM renadyl_users WHERE role = $1 AND status = 1`,
    ["client"]
  );
  const countActualMonthClients = await database.query(
    `SELECT COUNT(*) FROM renadyl_users WHERE role = $1 AND status = 1 AND EXTRACT(MONTH FROM register_date) = EXTRACT(MONTH FROM CURRENT_DATE)`,
    ["client"]
  );
  data.countAllClients = countAllClients[0].count;
  data.countActualMonthClients = countActualMonthClients[0].count;

  return NextResponse.json({
    status: 200,
    body: data,
  });
}

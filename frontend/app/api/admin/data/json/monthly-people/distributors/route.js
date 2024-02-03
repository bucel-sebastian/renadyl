import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const database = new Database();

  const data = new Object();

  const countAllDistributors = await database.query(
    `SELECT COUNT(*) FROM renadyl_distributors_form WHERE status = 1`
  );
  const countActualMonthDistributors = await database.query(
    `SELECT COUNT(*) FROM renadyl_distributors_form WHERE status = 1 AND EXTRACT(MONTH FROM status_update_date) = EXTRACT(MONTH FROM CURRENT_DATE)`
  );

  data.countAllDistributors = countAllDistributors[0].count;
  data.countActualMonthDistributors = countActualMonthDistributors[0].count;

  return NextResponse.json({
    status: 200,
    body: data,
  });
}

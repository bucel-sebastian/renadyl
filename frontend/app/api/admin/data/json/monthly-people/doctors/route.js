import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const database = new Database();

  const data = new Object();

  const countAllDoctors = await database.query(
    `SELECT COUNT(*) FROM renadyl_doctor_details WHERE doctor_status = 1`,
    []
  );

  const countActualMonthDoctors = await database.query(
    `SELECT COUNT(*) AS count
FROM renadyl_doctor_details dd
JOIN renadyl_users u ON dd.doctor_id = u.id
WHERE dd.doctor_status = '1'
  AND EXTRACT(MONTH FROM u.register_date) = EXTRACT(MONTH FROM CURRENT_DATE)`
  );

  data.countAllDoctors = countAllDoctors[0].count;
  data.countActualMonthDoctors = countActualMonthDoctors[0].count;

  return NextResponse.json({
    status: 200,
    body: data,
  });
}

import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const database = new Database();

  const data = new Object();

  const countAllAffiliates = await database.query(
    `SELECT COUNT(*) FROM renadyl_promo_codes WHERE user_id LIKE $1`,
    ["client%"]
  );
  const countActualMonthAffiliates = await database.query(
    `SELECT COUNT(*) FROM renadyl_promo_codes WHERE user_id LIKE $1 AND EXTRACT(MONTH FROM create_date) = EXTRACT(MONTH FROM CURRENT_DATE)`,
    ["client%"]
  );

  data.countAllAffiliates = countAllAffiliates[0].count;
  data.countActualMonthAffiliates = countActualMonthAffiliates[0].count;

  return NextResponse.json({
    status: 200,
    body: data,
  });
}

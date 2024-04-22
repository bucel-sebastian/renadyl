import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { doctorId } = params;
  console.log("accesat - ", doctorId);
  const database = new Database();

  const affiliatesResponse = await database.select("renadyl_promo_codes", {
    user_id: doctorId,
  });
  const affiliateCode =
    affiliatesResponse.length === 1 ? affiliatesResponse[0].code : null;

  const clientsIdsRows = await database.query(
    "SELECT DISTINCT client_id FROM renadyl_orders WHERE promo_code = $1 OR doctor->>'id' = $2",
    [affiliateCode, doctorId]
  );

  const clientIds = clientsIdsRows.map((obj) => obj.client_id);

  console.log(clientIds);

  const data = await database.query(
    "SELECT id, f_name, l_name,phone FROM renadyl_users WHERE id = ANY($1) AND status = $2 ",
    [clientIds, 1]
  );

  try {
    // data = await database.select(
    //   "renadyl_orders",
    //   { client_id: clientId },
    //   "date desc"
    // );
  } catch (error) {
    console.error(`Error - ${error}`);
  }

  return NextResponse.json({
    status: 200,
    body: data,
  });
}

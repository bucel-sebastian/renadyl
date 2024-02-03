import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  const database = new Database();

  const clientData = await database.select("renadyl_users", { id: id });

  delete clientData[0].password;

  const clientOrders = await database.select(
    "renadyl_orders",
    { client_id: id },
    "date desc"
  );

  const clientAffiliate = await database.select("renadyl_promo_codes", {
    user_id: id,
  });

  const clientSubscription = null;

  return NextResponse.json({
    status: 200,
    response: true,
    clientData: clientData[0],
    clientOrders: clientOrders,
    clientAffiliate: clientAffiliate[0],
    clientSubscription: clientSubscription,
  });
}

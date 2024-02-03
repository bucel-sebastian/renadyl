import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const database = new Database();

  const databaseResponse = await database.query(`SELECT
  COUNT(*) AS clienti_total,
  COUNT(client_id) AS clienti_autentificati,
  COUNT(*) - COUNT(client_id) AS clienti_anonimi
FROM renadyl_orders`);

  return NextResponse.json({
    status: 200,
    body: {
      totalClients: databaseResponse[0].clienti_total,
      loggedInClients: databaseResponse[0].clienti_autentificati,
      anonymousClients: databaseResponse[0].clienti_anonimi,
    },
  });
}

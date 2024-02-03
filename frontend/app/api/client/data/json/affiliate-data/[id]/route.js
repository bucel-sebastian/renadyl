import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  const database = new Database();

  const affiliateDatabaseResponse = await database.select(
    "renadyl_promo_codes",
    {
      user_id: id,
    }
  );

  const availabelPromocodesResponse = await database.select(
    "renadyl_promo_codes",
    { for_user_id: id }
  );

  if (affiliateDatabaseResponse.length !== 0) {
    return NextResponse.json({
      status: 200,
      affiliateData: affiliateDatabaseResponse[0],
      promocodesData: availabelPromocodesResponse,
    });
  } else {
    return NextResponse.json({
      status: 200,
      affiliateData: null,
      promocodesData: null,
    });
  }
}

import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const database = new Database();

  const generatePromocode = () => {
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let promocode = "";

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      promocode = promocode + characters.charAt(randomIndex);
    }

    return promocode;
  };

  const reqData = await req.json();
  const insertData = new Object();

  insertData["code"] = generatePromocode();
  insertData["user_id"] = reqData.id;
  insertData["value"] = 5;

  const databaseResponse = await database.insert(
    "renadyl_promo_codes",
    insertData
  );

  if (databaseResponse.length !== 0) {
    return NextResponse.json({
      status: 200,
      response: true,
    });
  } else {
    return NextResponse.json({
      status: 200,
      body: false,
    });
  }
}

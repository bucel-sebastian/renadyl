import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id, newStatus } = params;

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

  const database = new Database();

  const databaseResponse = await database.update(
    "renadyl_doctor_details",
    { doctor_status: newStatus },
    { doctor_id: id }
  );

  if (databaseResponse.length !== 0) {
    if (parseInt(newStatus) === 0) {
      await database.remove("renadyl_promo_codes", {
        user_id: id,
      });
    } else {
      await database.insert("renadyl_promo_codes", {
        code: await generatePromocode(),
        user_id: id,
        value: 5,
      });
    }

    return NextResponse.json({
      status: 200,
      response: true,
    });
  } else {
    return NextResponse.json({
      status: 200,
      response: false,
    });
  }
}

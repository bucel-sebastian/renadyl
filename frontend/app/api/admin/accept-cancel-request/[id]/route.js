import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  const database = new Database();

  const databaseResponse = await database.update(
    "renadyl_request_cancel_order",
    { status: 2 },
    { id: id }
  );

  if (databaseResponse.length !== 0) {
    const orderId = databaseResponse[0].order_id;
    const orderResponse = await database.update(
      "renadyl_orders",
      { status: 0 },
      { id: orderId }
    );

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

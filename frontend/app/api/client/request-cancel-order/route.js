import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const database = new Database();

  const reqData = await req.json();

  const insertData = new Object();
  insertData["order_id"] = reqData.order_id;
  insertData["reason"] = reqData.reason;
  insertData["status"] = 1;
  insertData["date"] = new Date().toISOString();

  const databaseResponse = await database.insert(
    "renadyl_request_cancel_order",
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
      response: false,
    });
  }
}

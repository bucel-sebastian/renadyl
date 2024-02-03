import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  const database = new Database();

  let data = null;

  try {
    data = await database.select("renadyl_orders", { id: id }, "date desc");
  } catch (error) {
    console.error(`Error - ${error}`);
  }

  if (data[0].client_id !== null) {
    const databaseResponse = await database.select("renadyl_users", {
      id: data[0].client_id,
    });
    return NextResponse.json({
      status: 200,
      body: data[0],
      client_data: {
        id:databaseResponse[0]?.id,
        fname: databaseResponse[0]?.f_name,
        lname: databaseResponse[0]?.l_name,
      },
    });
  }
  return NextResponse.json({
    status: 200,
    body: data[0],
   
  });
}

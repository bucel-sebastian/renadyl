import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const requestBody = await req.json();

  const database = new Database();

  const databaseResponse = new Object();

  for (var key in requestBody) {
    if (requestBody.hasOwnProperty(key)) {
      var value = requestBody[key];

      databaseResponse[key] =
        (await database.update(
          "renadyl_settings",
          { value: value, update_date: new Date().toISOString() },
          { name: key }
        ).length) !== 0;
    }
  }

  for (var key in databaseResponse) {
    if (databaseResponse[key] !== true) {
      return NextResponse.json({
        status: 200,
        response: false,
        database: databaseResponse,
      });
    }
  }

  return NextResponse.json({
    status: 200,
    response: true,
    database: databaseResponse,
  });
}

import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const database = new Database();

  const reqData = await req.json();
  const insertData = new Object();

  insertData["f_name"] = reqData.fname;
  insertData["l_name"] = reqData.lname;
  insertData["phone"] = reqData.phone;
  insertData["email"] = reqData.email;
  insertData["country"] = reqData.country;
  insertData["country_key"] = reqData.countryKey;
  insertData["state"] = reqData.state;
  insertData["state_key"] = reqData.stateKey;
  insertData["city"] = reqData.city;
  insertData["city_key"] = reqData.cityKey;
  insertData["address"] = reqData.address;
  insertData["postal_code"] = reqData.postalCode;
  insertData["client_id"] = reqData.clientId;
  insertData["date"] = new Date().toISOString();

  const databaseResponse = await database.insert(
    "renadyl_shipping_details",
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

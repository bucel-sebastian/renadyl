import { NextResponse } from "next/server";

export async function POST(req, res) {
  console.log("Request confirm post");
  return NextResponse.json({
    status: 200,
    body: "Accesare confirm payment",
  });
}
export async function GET(req, res) {
  console.log("Request confirm GET");
  return NextResponse.json({
    status: 200,
    body: "Accesare confirm payment GET",
  });
}
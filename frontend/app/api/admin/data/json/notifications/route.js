import Database from "@/utils/Database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const database = new Database();

  const data = new Object();

  const countOrders = await database.query(
    "SELECT COUNT(*) FROM renadyl_orders WHERE status = $1",
    [1]
  );
  const countInactiveDoctors = await database.query(
    "SELECT COUNT(*) FROM renadyl_doctor_details WHERE doctor_status = $1",
    [0]
  );
  const countCancelRequests = await database.query(
    "SELECT COUNT(*) FROM renadyl_request_cancel_order WHERE status = $1",
    [1]
  );
  const countDistribuitorForm = await database.query(
    "SELECT COUNT(*) FROM renadyl_distributors_form WHERE status = $1",
    [0]
  );
  const countContactForm = await database.query(
    "SELECT COUNT(*) FROM renadyl_contact_form WHERE status = $1",
    [0]
  );

  data.orders = countOrders[0].count;
  data.inactiveDoctors = countInactiveDoctors[0].count;
  data.cancelRequests = countCancelRequests[0].count;
  data.distribuitorForm = countDistribuitorForm[0].count;
  data.contactForm = countContactForm[0].count;

  return NextResponse.json({
    status: 200,
    body: data,
  });
}

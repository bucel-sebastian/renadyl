import Database from "@/utils/Database";
import generateSamedayAwb from "@/utils/sameday/generateSamedayAwb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  const database = new Database();

  const ordersList = await database.select("renadyl_orders", { id: id });
  const orderData = await ordersList[0];

  const billingDetails = JSON.parse(await orderData.billing_details);
  const shippingDetails = JSON.parse(await orderData.shipping_details);

  const payment = orderData.payment;
  const orderTotal = orderData.order_total;
  const currency = orderData.currency;
  const shippingAwb = orderData.shipping_awb;

  let awbResponse = null;
  if (shippingDetails.provider === "Sameday") {
    awbResponse = await generateSamedayAwb({
      orderData: orderData,
      billingDetails: billingDetails,
      shippingDetails: shippingDetails,
      payment: payment,
      orderTotal: orderTotal,
      currency: currency,
      shippingAwb: shippingAwb,
    });
  } else if (shippingDetails.provider === "UPS") {
    //    awbResponse = await ({
    //   orderData: orderData,
    //   billingDetails: billingDetails,
    //   shippingDetails: shippingDetails,
    //   payment: payment,
    //   orderTotal: orderTotal,
    //   currency: currency,
    //   shippingAwb: shippingAwb,
    // });
  } else if (shippingDetails.provider === "DHL") {
    //    awbResponse = await ({
    //   orderData: orderData,
    //   billingDetails: billingDetails,
    //   shippingDetails: shippingDetails,
    //   payment: payment,
    //   orderTotal: orderTotal,
    //   currency: currency,
    //   shippingAwb: shippingAwb,
    // });
  }

  if (awbResponse !== null) {
    return NextResponse.json({
      status: 200,
      body: shippingDetails,
    });
  }

  return NextResponse.json({
    status: 400,
    body: "Eroare creare AWB",
  });
}

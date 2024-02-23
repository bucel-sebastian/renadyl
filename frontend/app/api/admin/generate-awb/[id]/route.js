import Database from "@/utils/Database";
import { sendSamedayAwbEmail } from "@/utils/nodemailer/AwbGeneratedMail";
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

  if (shippingDetails.provider === "Sameday") {
    const awbResponse = await generateSamedayAwb({
      orderData: orderData,
      billingDetails: billingDetails,
      shippingDetails: shippingDetails,
      payment: payment,
      orderTotal: orderTotal,
      currency: currency,
      shippingAwb: shippingAwb,
    });

    if (awbResponse !== null) {
      const databaseResponse = await database.update(
        "renadyl_orders",
        {
          shipping_awb: {
            awbNumber: awbResponse.awbNumber,
            cost: awbResponse.awbCost,
            pdfLink: awbResponse.pdfLink,
          },
        },
        { id: id }
      );

      const emailResponse = await sendSamedayAwbEmail({
        lang: "ro",
        order_id: id,
        shipping: JSON.parse(databaseResponse[0].shipping_details),
        client_id: databaseResponse[0].client_id,
      });

      return NextResponse.json({
        status: 200,
        body: databaseResponse[0],
        email: emailResponse,
      });
    }
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
    return NextResponse.json({
      status: 200,
      body: null,
    });
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
    return NextResponse.json({
      status: 200,
      body: null,
    });
  }

  return NextResponse.json({
    status: 400,
    body: "Eroare creare AWB",
  });
}

import Database from "@/utils/Database";
import generateDhlAwb from "@/utils/dhl/generateDhlAwb";
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

      console.log("db response - ", databaseResponse[0]);

      const emailResponse = await sendSamedayAwbEmail({
        lang: "ro",
        order_id: id,
        shipping_awb: {
          awbNumber: awbResponse.awbNumber,
          cost: awbResponse.awbCost,
          pdfLink: awbResponse.pdfLink,
        },
        shipping: JSON.parse(databaseResponse[0].shipping_details),
        client_id: databaseResponse[0].client_id,
      });

      console.log("email response - ", emailResponse);

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

    const awbResponse = await generateDhlAwb({
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
            awbNumber: awbResponse.shipmentTrackingNumber,
            cost: awbResponse,
            // pdfLink: awbResponse.documents,
          },
        },
        { id: id }
      );

      console.log("db response - ", databaseResponse[0]);

      // const emailResponse = await sendSamedayAwbEmail({
      //   lang: "ro",
      //   order_id: id,
      //   shipping_awb: {
      //     awbNumber: awbResponse.awbNumber,
      //     cost: awbResponse.awbCost,
      //     pdfLink: awbResponse.documents,
      //   },
      //   shipping: JSON.parse(databaseResponse[0].shipping_details),
      //   client_id: databaseResponse[0].client_id,
      // });

      // console.log("email response - ", emailResponse);

      return NextResponse.json({
        status: 200,
        body: databaseResponse[0],
        email: null,
        // email: emailResponse,
      });
    }
  }

  return NextResponse.json({
    status: 400,
    body: "Eroare creare AWB",
  });
}

const dhlREsp = {
  awbNumber: "4897011711",
  pdfLink: [
    {
      imageFormat: "PDF",
      content:
        "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SYNlW9ZKRnXhtGOonbx8P9QKTV00pxlqSiBiBHXkrMjUUZOmplYyquVweah577AJ1aCp9STa1PSxFFAnm9WHDodayajONu31GCbb/GjQ1BlXxbWUdQFazvsItFzhUCsZ1YVT4KEO8mb5UCs0ddH8eah5I4IR4xgLfa5wqJWM6oIbuRxRwFRTaOoy7+ZcdG0O1BEXR4NDrWRUy3ucQ031GOzpDZq6aF081LwZgThzKWPirJVOEwsXtdUWhT7cD8HECk1ccclwUSSv1Zs62KQ/dDjUSgY1b1PQ47zbmFiQBd0N93vWyju+pq3THFdoaiGDum7THOddB+a4wqFWMqrjCjddMyf6Js5aB3RxXKd75k3KxH6TQ4IR9xWauM57Phc2WwR1tgl/6HCkDUpGtbyjYknONmc5G66PRgY1FTQ+gzpa/nLocKiVjOqM64P//gxiQIOmzvP6aGWHqdMKDRdkaVacowAXHBAF+A+kYHk0aOo6RwEuXza46z3jDG9wqJUMakqGIIXhqgGiQINDrWRUB0hjpGSADldo4jBlMvKnNTBTYrT85NDhECsZ1ckWhFYS0GWCTJtwsWgRARFAi4ahbRVF19Z5///dAiJr8RO4gGkvpZb25xM/f/Pjz98uP76kCRPSRnRH3ZK3Kn9AsGOO/1/07/8ApIXHxwplbmRzdHJlYW0KZW5kb2JqCjUgMCBvYmoKPDwvS2lkc1s2IDAgUl0vVHlwZS9QYWdlcy9Db3VudCAxL0lUWFQoMi4xLjcpPj4KZW5kb2JqCjcgMCBvYmoKPDwvVHlwZS9DYXRhbG9nL1BhZ2VzIDUgMCBSPj4KZW5kb2JqCjggMCBvYmoKPDwvTW9kRGF0ZShEOjIwMjQwMzAzMjI0NDU5WikvQ3JlYXRpb25EYXRlKEQ6MjAyNDAzMDMyMjQ0NTlaKS9Qcm9kdWNlcihpVGV4dCAyLjEuNyBieSAxVDNYVCk+PgplbmRvYmoKeHJlZgowIDkKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwNDgwIDAwMDAwIG4gCjAwMDAwMDAyOTkgMDAwMDAgbiAKMDAwMDAwMDM5MiAwMDAwMCBuIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDUwMjMgMDAwMDAgbiAKMDAwMDAwMDEzMiAwMDAwMCBuIAowMDAwMDA1MDg2IDAwMDAwIG4gCjAwMDAwMDUxMzEgMDAwMDAgbiAKdHJhaWxlcgo8PC9JbmZvIDggMCBSL0lEIFs8NDBhMzZkM2U0MjE0YTZiNDhiNzM0MWQ1ZDM0MjM1MzE+PDNhYjE1ODEwYzg4MzljMjgwOGNiNzJlNzkwMzY3MjhkPl0vUm9vdCA3IDAgUi9TaXplIDk+PgpzdGFydHhyZWYKNTI0MQolJUVPRgo=",
      typeCode: "label",
    },
  ],
};

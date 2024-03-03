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
            cost: awbResponse.awbCost,
            pdfLink: awbResponse.documents,
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
  awbNumber: "4896997792",
  pdfLink: [
    {
      imageFormat: "PDF",
      content:
        "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ZVvWSkZ14bJjqJ1cwh9qhaYuWtMMNRUQMYI6clVk6qhFU1MrGdXyknmoOXbYhGrQ1PpG2tT0aymgTjarDx0OtZJRnW3a64uYbPOjQVNnXBXXsq0L0HKOI9ByhUOtZFQXLoGHOsgN86FWaOqi9fNQcyCCEeMcC32ucKiVjOqCgdxxTIGpptDUZY7mvOnaHKgjLo4Gh1rJqJb7nENN+zGI6Q2auui+eKg5GIE481bGxFl3Ok0sXNRWWxR6uB+CiRWauOKS4U2RXK83dbBJf+hwqJUMag5T0OMcbUwsyJLuhvGetXLX17R1muMKTS1kUNdtmuMcdWCOKxxqJaM6rvDQNXOhb+Ks+4Aujuv0zBykTOw56kDeV2jiOsd83thsEdTZJvyhw1E2KBnVclfFihyHkb9BU+vFFlPThsZnUOepYlE41EpGdcUUwP+6DWZ4g6aucxbgf2+VQJwxCzRodVaaZjhvOCAL8O6hQLsVmrjOWYC3DhDH+R81Qf3S4FArGdQcsaDhtIuAGqbBoVYyqgOUMbJlCCDOOKeVC1qOV9DuGK0+OXQ4xEpGdbIFoTsJ6DJBpk24WHQTARlANw1D23YUXVvn+P+7G4ism5/AG5h2ObW0f0bx8zc//vzt8uNLmn0hbUR31C15q3I7t2CN/1/05/8AhV/JbwplbmRzdHJlYW0KZW5kb2JqCjUgMCBvYmoKPDwvS2lkc1s2IDAgUl0vVHlwZS9QYWdlcy9Db3VudCAxL0lUWFQoMi4xLjcpPj4KZW5kb2JqCjcgMCBvYmoKPDwvVHlwZS9DYXRhbG9nL1BhZ2VzIDUgMCBSPj4KZW5kb2JqCjggMCBvYmoKPDwvTW9kRGF0ZShEOjIwMjQwMzAzMjIxMDIzWikvQ3JlYXRpb25EYXRlKEQ6MjAyNDAzMDMyMjEwMjNaKS9Qcm9kdWNlcihpVGV4dCAyLjEuNyBieSAxVDNYVCk+PgplbmRvYmoKeHJlZgowIDkKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwNDgwIDAwMDAwIG4gCjAwMDAwMDAyOTkgMDAwMDAgbiAKMDAwMDAwMDM5MiAwMDAwMCBuIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDUwMjAgMDAwMDAgbiAKMDAwMDAwMDEzMiAwMDAwMCBuIAowMDAwMDA1MDgzIDAwMDAwIG4gCjAwMDAwMDUxMjggMDAwMDAgbiAKdHJhaWxlcgo8PC9JbmZvIDggMCBSL0lEIFs8YTk4M2Q0NTlhNDEzZjg1YmQwYWZkODBkNTc3OTFkZjE+PDI4YzM0YTMxYjZmNzY5NjY2ZmZkOGQ2MjEzZmZlZjIwPl0vUm9vdCA3IDAgUi9TaXplIDk+PgpzdGFydHhyZWYKNTIzOAolJUVPRgo=",
      typeCode: "label",
    },
  ],
};

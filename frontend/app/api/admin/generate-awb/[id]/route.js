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
      let estimatedCost;

      if (currency === "RON") {
        for (let i = 0; i < awbResponse?.shipmentCharges?.length; i++) {
          if (
            awbResponse?.shipmentCharges?.currencyType === "BASEC" ||
            awbResponse?.shipmentCharges?.currencyType === "BILLC"
          ) {
            if (awbResponse?.shipmentCharges?.priceCurrency === "RON") {
              estimatedCost = awbResponse?.shipmentCharges.price;
            }
          }
        }
      } else {
        for (let i = 0; i < awbResponse?.shipmentCharges?.length; i++) {
          if (
            awbResponse?.shipmentCharges?.currencyType === "BASEC" ||
            awbResponse?.shipmentCharges?.currencyType === "BILLC"
          ) {
            if (awbResponse?.shipmentCharges?.priceCurrency === "EUR") {
              estimatedCost = awbResponse?.shipmentCharges?.price;
            }
          }
        }
      }

      const databaseResponse = await database.update(
        "renadyl_orders",
        {
          shipping_awb: {
            awbNumber: awbResponse.shipmentTrackingNumber,
            cost: estimatedCost,
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
  awbNumber: "4897016073",
  cost: {
    shipmentTrackingNumber: "4897016073",
    trackingUrl:
      "https://express.api.dhl.com/mydhlapi/shipments/4897016073/tracking",
    packages: [
      {
        referenceNumber: 1,
        trackingNumber: "JD014600011470914569",
        trackingUrl:
          "https://express.api.dhl.com/mydhlapi/shipments/4897016073/tracking?pieceTrackingNumber=JD014600011470914569",
      },
    ],
    documents: [
      {
        imageFormat: "PDF",
        content:
          "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Za1kVBcuO4bayev3Q63Q1EVrmqGmAiJGUEeuikwdtWhqaiWjWo6Xh5pjh02oBk2tZ9Gmpo+lgDrZrD50ONRKRnW2aa/HMNnmR4OmzrgqLmVbF6DlHEeg5QqHWsmoLlwCD3WQd8uHWqGpi9bPQ82BCEaMcyz0ucKhVjKqCwZyOaKAqabQ1GWO5rzp2hyoIy6OBodayaiWNzmHmvZjENMbNHXRffFQczACceatjImz7nSaWLiorbYo9OF+CCZWaOKKS4Y3RfJivamDTfpDh0OtZFBzmIIe52hjYkGWdDeM96yVt3xNW6c5rtDUQgZ13aY5zlEH5rjCoVYyquMKN10zF/omzroP6OK4TvfMQcrEftsw4jdo4jrHfL/JmYKpE0b9BkfZoGRUZ1wf/CdZU5Wz4fpoZFDThsZnUEerXw4dDrWSUZ1xfcifb0HLFZo6z+uD/2ANSh7+qzhYHw1aoeXnqoe3HJAH+I+kYIE0aOo65wHewGxw33owYeodV0gjo7pYwXMt+wbIAw2aumA9dCl/kAUN5wgGl1Y4xMIFLUcsi6X8x1s7XDlGLEQaGdXJloTuJaDLBJk24XLRbQTkAN02DG3bU3RtnTPA724hsm5/Am9h2ouppf0Jxc/f/Pjzt8uPr2nKhLQR3VG35K0SjKlilf9f9O//AN1JyI4KZW5kc3RyZWFtCmVuZG9iago1IDAgb2JqCjw8L0tpZHNbNiAwIFJdL1R5cGUvUGFnZXMvQ291bnQgMS9JVFhUKDIuMS43KT4+CmVuZG9iago3IDAgb2JqCjw8L1R5cGUvQ2F0YWxvZy9QYWdlcyA1IDAgUj4+CmVuZG9iago4IDAgb2JqCjw8L01vZERhdGUoRDoyMDI0MDMwMzIyNTUyMVopL0NyZWF0aW9uRGF0ZShEOjIwMjQwMzAzMjI1NTIxWikvUHJvZHVjZXIoaVRleHQgMi4xLjcgYnkgMVQzWFQpPj4KZW5kb2JqCnhyZWYKMCA5CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDQ4MCAwMDAwMCBuIAowMDAwMDAwMjk5IDAwMDAwIG4gCjAwMDAwMDAzOTIgMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDA1MDI0IDAwMDAwIG4gCjAwMDAwMDAxMzIgMDAwMDAgbiAKMDAwMDAwNTA4NyAwMDAwMCBuIAowMDAwMDA1MTMyIDAwMDAwIG4gCnRyYWlsZXIKPDwvSW5mbyA4IDAgUi9JRCBbPDRhN2Q4NmRiNjhmMWM2ZjVhYmJiYWJkNDBiNDBiZTA1Pjw3NDM0OWYwMjdkYzAyZGExMjgzNjczNmM1N2U2MmJiYj5dL1Jvb3QgNyAwIFIvU2l6ZSA5Pj4Kc3RhcnR4cmVmCjUyNDIKJSVFT0YK",
        typeCode: "label",
      },
    ],
    shipmentCharges: [
      {
        currencyType: "BILLC",
        priceCurrency: "RON",
        price: 121.5,
        serviceBreakdown: [
          { name: "EXPRESS WORLDWIDE", price: 92.27 },
          { name: "EMERGENCY SITUATION", price: 1.19, typeCode: "CR" },
          { name: "FUEL SURCHARGE", price: 28.04, typeCode: "FF" },
        ],
      },
      {
        currencyType: "PULCL",
        priceCurrency: "RON",
        price: 121.5,
        serviceBreakdown: [
          { name: "EXPRESS WORLDWIDE", price: 92.27 },
          { name: "EMERGENCY SITUATION", price: 1.19, typeCode: "CR" },
          { name: "FUEL SURCHARGE", price: 28.04, typeCode: "FF" },
        ],
      },
      {
        currencyType: "BASEC",
        priceCurrency: "EUR",
        price: 24.44,
        serviceBreakdown: [
          { name: "EXPRESS WORLDWIDE", price: 18.56 },
          { name: "EMERGENCY SITUATION", price: 0.24, typeCode: "CR" },
          { name: "FUEL SURCHARGE", price: 5.64, typeCode: "FF" },
        ],
      },
    ],
  },
};

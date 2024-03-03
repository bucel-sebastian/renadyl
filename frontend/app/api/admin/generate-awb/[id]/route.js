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

      console.log("Charges - ", awbResponse?.shipmentCharges);

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
          shipping_awb: awbResponse,
          // {
          //   awbNumber: awbResponse.shipmentTrackingNumber,
          //   cost: estimatedCost,
          //   pdfLink: awbResponse.documents,
          // },
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
  awbNumber: "4963259604",
  pdfLink: [
    {
      imageFormat: "PDF",
      content:
        "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wXZyDX+wFRq7aE4z2JRAxAjsyFmRsaMmTY2txsiWI+bBZt9hE6pBY+t5tLHpYynATjarDx0OthojO9u056pr4wxwsBUaO+OquJayLkDL2Y9AyxUOthoju3AKPNhB7pgPtkJjF82fB5sdEYwYx1joc4WDrcbILujIHfsUmGoKjV1mb85F1+aAHXFxNDjYaoxsudE52FSPgU9v0NhF6+LBZmcE5MyljJGzVjqNLLbIrbYodHM/BCMrNHLFJcNFkVywN3awSX/ocLDVGNjspqDH2dsYWZAF3Q39PXPl9M64dZrjCo2tR33Grts0x9nrwBxXONhqjOy4wkvXzIm+kbPWAZ0c1+md2UkZ2W9ySDDivkIj19nncyGTCrATev0GR9qwBVwu11LUYKpCFQnkKoIG17mjbIXKGZ+BGy17OXRo7ICLRUsdWB3yR1zQboXGzvPq4D+GKzbBWw0y2L2E6WnWjotFCxSIAvynUrA8GjR2naMAly8bvLceSxh7x/XRjJGdMQrwn1156HKFxs5zFOCjI2g4+y94tMJBFlvgsr+CJ8do+cmhw0FWY2QnWxBaSUCXCTJuwsWiRQREAC0aBrdVFJ1bZ///uwVE1uIncAHTrqeW9ocUP3/z48/fLj++pCkT0kbmjrolb9UticIN5vj/Rf/+DzbjyaMKZW5kc3RyZWFtCmVuZG9iago1IDAgb2JqCjw8L0tpZHNbNiAwIFJdL1R5cGUvUGFnZXMvQ291bnQgMS9JVFhUKDIuMS43KT4+CmVuZG9iago3IDAgb2JqCjw8L1R5cGUvQ2F0YWxvZy9QYWdlcyA1IDAgUj4+CmVuZG9iago4IDAgb2JqCjw8L01vZERhdGUoRDoyMDI0MDMwMzIzMTg0OVopL0NyZWF0aW9uRGF0ZShEOjIwMjQwMzAzMjMxODQ5WikvUHJvZHVjZXIoaVRleHQgMi4xLjcgYnkgMVQzWFQpPj4KZW5kb2JqCnhyZWYKMCA5CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDQ4MCAwMDAwMCBuIAowMDAwMDAwMjk5IDAwMDAwIG4gCjAwMDAwMDAzOTIgMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDA1MDIxIDAwMDAwIG4gCjAwMDAwMDAxMzIgMDAwMDAgbiAKMDAwMDAwNTA4NCAwMDAwMCBuIAowMDAwMDA1MTI5IDAwMDAwIG4gCnRyYWlsZXIKPDwvSW5mbyA4IDAgUi9JRCBbPGRkOTY0MWRkNThjZjUyOTFjZTBiYjRkZDhjZDFmZGU3PjwyNzE0YTJiMGRmNDkyZTM4NTQxZDIxOWU2MjU0NjgzOT5dL1Jvb3QgNyAwIFIvU2l6ZSA5Pj4Kc3RhcnR4cmVmCjUyMzkKJSVFT0YK",
      typeCode: "label",
    },
  ],
};

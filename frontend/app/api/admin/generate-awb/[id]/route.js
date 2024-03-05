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
          shipping_awb: {
            awbNumber: awbResponse.shipmentTrackingNumber,
            cost: estimatedCost,
            pdfLink: awbResponse.documents[0],
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
  shipmentTrackingNumber: "4963267945",
  trackingUrl:
    "https://express.api.dhl.com/mydhlapi/shipments/4963267945/tracking",
  packages: [
    {
      referenceNumber: 1,
      trackingNumber: "JD014600011470917098",
      trackingUrl:
        "https://express.api.dhl.com/mydhlapi/shipments/4963267945/tracking?pieceTrackingNumber=JD014600011470917098",
    },
  ],
  documents: [
    {
      imageFormat: "PDF",
      content:
        "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rWRUFy47htrJh/hDrdDURWuaoaYCIkZQR66KTB21aGpqJaNaXjIPNccOm1ANmlrfSJuafiwF1Mlm9aHDoVYyqrNNe951bVwBDrVCU2dcFdeyrQvQco4j0HKFQ61kVBcugYc6yFfmQ63Q1EXr56HmQAQjxjkW+lzhUCsZ1QUDubyigKmm0NRljua86docqCMujgaHWsmolm86h5r2YxDTGzR10X3xUHMwAnHmrYyJs+50mli4qK22KPRwPwQTKzRxxSXDmyL5xN7UwSb9ocOhVjKoOUxBj3O0MbEgS7obxnvWyts709Zpjis0tb7qM3XdpjnOUQfmuMKhVjKq4woPXTMX+ibOug/o4rhOz8xBysR+2zDiN2jiOsd8v8k7BVMHXB8NjrJByaDmmGUThfc4EPkbHGolozrYgtDdSo6grhi4GxmrJIcznH8XDXJAg1YquXmG8+9cQcM56GQQZ8wCykVtxSzA+5ENxApNXOcswJsNmOG8c4As0OBQKxnVxcod3VVADdOgqQtWQ9fyi1nQcI5fAcQZ57RyQcvxyiIp/xLXDhVtjFiGNDKqky0I3UlAcSrItAkXi24iIAPopmFo246ia+sc/393A5F18xN4A9M+UC3tVyl+/ubHn79dfnxJATWkjeiOuiVv1fH/Ctb4/0X//h9GyMn6CmVuZHN0cmVhbQplbmRvYmoKNSAwIG9iago8PC9LaWRzWzYgMCBSXS9UeXBlL1BhZ2VzL0NvdW50IDEvSVRYVCgyLjEuNyk+PgplbmRvYmoKNyAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgNSAwIFI+PgplbmRvYmoKOCAwIG9iago8PC9Nb2REYXRlKEQ6MjAyNDAzMDMyMzM3MTdaKS9DcmVhdGlvbkRhdGUoRDoyMDI0MDMwMzIzMzcxN1opL1Byb2R1Y2VyKGlUZXh0IDIuMS43IGJ5IDFUM1hUKT4+CmVuZG9iagp4cmVmCjAgOQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDA0ODAgMDAwMDAgbiAKMDAwMDAwMDI5OSAwMDAwMCBuIAowMDAwMDAwMzkyIDAwMDAwIG4gCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwNTAyMiAwMDAwMCBuIAowMDAwMDAwMTMyIDAwMDAwIG4gCjAwMDAwMDUwODUgMDAwMDAgbiAKMDAwMDAwNTEzMCAwMDAwMCBuIAp0cmFpbGVyCjw8L0luZm8gOCAwIFIvSUQgWzw4YWEzMmYwZTk2MzdhYmFmMjRmNTA1Y2EwOTI2MzJhMj48MjYwZjdjZmJmMDVkMTcwNmI0M2NiN2U2OTk2Zjc3OTQ+XS9Sb290IDcgMCBSL1NpemUgOT4+CnN0YXJ0eHJlZgo1MjQwCiUlRU9GCg==",
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
};

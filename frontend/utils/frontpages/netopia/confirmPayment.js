import Database from "@/utils/Database";

export const dynamic = "force-dynamic";

export const confirmPayment = async (data) => {
  const database = new Database();

  const dataParams = new URLSearchParams(data);

  const paymentData = {
    env_key: dataParams.get("env_key"),
    data: dataParams.get("data"),
    cipher: dataParams.get("cipher"),
    iv: dataParams.get("iv"),
  };

  const {
    decodeResponse,
  } = require("@/utils/frontpages/netopia/getPaymentData");

  let dbResponse;
  let requestResponse;

  try {
    const decodedPaymentData = await decodeResponse(paymentData);

    console.log(
      "decoded payment - ",
      JSON.stringify(decodedPaymentData, null, 2)
    );

    dbResponse = await database.update(
      "renadyl_orders",
      {
        payment_status: {
          status: decodedPaymentData.order.mobilpay.action,
          timestamp: decodedPaymentData.order["$"].timestamp,
        },
      },
      { id: decodedPaymentData.order["$"].id }
    );

    requestResponse = `<?xml version="1.0" encoding="utf-8" ?>
    <crc error_code="${decodedPaymentData.order.mobilpay.error["$"].code}">${decodedPaymentData.order.mobilpay.error["_"]}</crc>`;
  } catch (error) {
    console.log("ERROR - ", error);
  }

  return requestResponse;
};

// const decoded = {
//   order: {
//     $: {
//       id: "rnd3375256167",
//       timestamp: "1713896870119",
//       type: "card",
//     },
//     signature: "2VZR-GOQH-7A8W-VLRB-UOOW",
//     url: {
//       return: "https://renadyleurope.com/order-placed/",
//       confirm: "https://www.renadyleurope.com/api/v2/confirm",
//     },
//     invoice: {
//       $: {
//         currency: "RON",
//         amount: "477",
//       },
//       details: "Plata Renadyl",
//       contact_info: {
//         billing: {
//           $: {
//             type: "company",
//           },
//           first_name: "",
//           last_name: "",
//           address: ", , , ,  ",
//           email: "",
//           mobile_phone: "",
//         },
//         shipping: {
//           $: {
//             type: "person",
//           },
//           first_name: "Ion-Sebastian",
//           last_name: "Bucel",
//           address: "dfasd asdf a, 900294, Abramuţ, Bihor , Romania ",
//           email: "bucel.ionsebastian@gmail.com",
//           mobile_phone: "+07 746 890 80",
//         },
//       },
//     },
//     ipn_cipher: "aes-256-cbc",
//     mobilpay: {
//       $: {
//         timestamp: "20240423212806",
//         crc: "a744a4242e4b84a8dfb4fb06e889dfa0",
//       },
//       action: "confirmed",
//       customer: {
//         $: {
//           type: "person",
//         },
//         first_name: "Test+Test",
//         last_name: "Test+Test",
//         address: "%2C+%2C+%2C+%2C++",
//         email: "mail%40mail.com",
//         mobile_phone: "1234567789",
//       },
//       purchase: "1765756",
//       original_amount: "477.00",
//       processed_amount: "477.00",
//       current_payment_count: "1",
//       pan_masked: "9****5098",
//       rrn: "9991713",
//       payment_instrument_id: "41679",
//       token_id:
//         "NTkwMjY6iQ6wD4SSpBMPxnBqjWAVNP7y8LGcToLA0NmOwqE4YYxraoAoZJGogTWSx1dHuLxPJW95LUmeg/7Rku5czBqwvA==",
//       token_expiration_date: "2027-01-31 23:59:59",
//       error: {
//         _: "Tranzactie aprobata",
//         $: {
//           code: "0",
//         },
//       },
//     },
//   },
// };

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
  } catch (error) {
    console.log("ERROR - ", error);
  }

  return dbResponse;
};

const decoded = {
  order: {
    $: { id: "rnd8195052718", timestamp: "1713885842436", type: "card" },
    signature: "2VZR-GOQH-7A8W-VLRB-UOOW",
    url: {
      return: "https://renadyleurope.com/order-placed/",
      confirm: "https://www.renadyleurope.com/api/v2/confirm",
    },
    invoice: { $: [Object], details: "Plata Renadyl", contact_info: [Object] },
    ipn_cipher: "aes-256-cbc",
    mobilpay: {
      $: [Object],
      action: "confirmed",
      customer: [Object],
      purchase: "1765456",
      original_amount: "477.00",
      processed_amount: "477.00",
      current_payment_count: "1",
      pan_masked: "9****5098",
      rrn: "9991713",
      payment_instrument_id: "41679",
      token_id:
        "NTkwMTk6SLDsfAv+Pef9LE9mGEY2Yu8B3XgyUl/rn6LdhFgtYGNCoV8ZInF78WpFFl/V5NV3p6B1xyowEaS9HymqG1qGOw==",
      token_expiration_date: "2027-01-31 23:59:59",
      error: [Object],
    },
  },
};

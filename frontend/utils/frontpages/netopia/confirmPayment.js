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

    console.log("decoded payment - ", decodedPaymentData);

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

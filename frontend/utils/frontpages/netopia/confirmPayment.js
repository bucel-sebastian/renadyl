import Database from "@/utils/Database";

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

  try {
    const decodedPaymentData = await decodeResponse(paymentData);
    console.log("decodde paymetn data", decodedPaymentData);
  } catch (error) {
    console.log("ERROR - ", error);
  }
};

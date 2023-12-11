import { authSameday } from "./authSameday";

export const estimateSamedayCost = async (data) => {
  const paymentMethod = data.payment;
  const shippingType = data.type;
  // const currency = data.get("currency");

  const reqHeaders = new Headers();
  reqHeaders.append("X-AUTH-TOKEN", await authSameday());
  const options = {
    method: "GET",
    headers: reqHeaders,
  };

  let deliveryService = shippingType === "courier" ? 7 : 16;
  let cashOnDelivery =
    shippingType === "courier" ? (paymentMethod === "cash" ? 1 : 0) : 0;
  let insuredValue = 0;
  let parcelsWeight = 2;

  const reqParams = [
    `packageType=1`,
    `packageWeight=2`,
    `service=${deliveryService}`,
    `cashOnDelivery=${cashOnDelivery}`,
    `insuredValue=${insuredValue}`,
    `packageNumber=1`,
    `parcels[][weight]=${parcelsWeight}`,
    // `currency=${currency}`,
  ];

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SAMEDAY_API_ESTIMATE_COST_URL}?${reqParams.join(
      "&"
    )}`,
    options
  );
  const body = await response.json();

  if (body.amount % 1 !== 0) {
    body.amount = Math.ceil(body.amount);
  }

  return body;
};

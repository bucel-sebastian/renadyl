import Database from "../Database";
import { authSameday } from "./authSameday";

const getSamedayCounty = async (state, apiToken) => {
  const response = await fetch(
    `${process.env.SAMEDAY_API_GEOLOCATION_COUNTY_URL}?name=${state}`,
    {
      method: "GET",
      headers: {
        "X-AUTH-TOKEN": apiToken,
      },
    }
  );

  console.log("County response - ", response);

  if (response.ok) {
    const body = await response.json();
    console.log("county - ", body);
  } else {
    console.log("country error - ", await response.json());
  }
  return;
};

const getSamedayCity = async (city, apiToken) => {
  const reqHeaders = new Headers();
  reqHeaders.append("X-AUTH-TOKEN", apiToken);

  const response = await fetch(
    `${process.env.SAMEDAY_API_GEOLOCATION_CITY_URL}?name=${city}`,
    {
      method: "GET",
      headers: reqHeaders,
    }
  );
  console.log(response);
  if (response.ok) {
    const body = await response.json();
    console.log("city - ", body);
  }
  return;
};

const generateSamedayAwb = async (data) => {
  const database = new Database();

  const apiToken = await authSameday();

  const {
    orderData,
    billingDetails,
    shippingDetails,
    payment,
    orderTotal,
    currency,
    shippingAwb,
  } = data;

  console.log("awb data ", data);

  const requestData = new FormData();

  requestData.append("pickupPoint", process.env.SAMEDAY_API_PICKUP_POINT_ID);
  requestData.append("packageType", 0);
  requestData.append("packageWeight", 1);
  requestData.append("service", shippingDetails.type === "courier" ? 7 : 16);
  if (shippingDetails.type === "easybox") {
    requestData.append("lockerLastMile", shippingDetails.locker.lockerId);
  }
  requestData.append("awbPayment", 1);
  requestData.append("cashOnDelivery", payment === "card" ? 0 : orderTotal);
  requestData.append("insuredValue", 0);
  requestData.append("thirdPartyPickup", 0);
  requestData.append("geniusOrder", 0);
  requestData.append(
    "awbRecipient[name]",
    `${shippingDetails.lname} ${shippingDetails.fname}`
  );
  requestData.append("awbRecipient[phoneNumber]", `${shippingDetails.phone}`);
  requestData.append(
    "awbRecipient[personType]",
    billingDetails.entity === "pf" ? 0 : 1
  );
  if (billingDetails.entity === "pj") {
    requestData.append(
      "awbRecipient[companyName]",
      `${billingDetails.companyName}`
    );
    requestData.append(
      "awbRecipient[companyCui]",
      `${billingDetails.companyCif}`
    );
  }
  requestData.append(
    "awbRecipient[postalCode]",
    `${shippingDetails.postalCode}`
  );
  requestData.append("awbRecipient[address]", `${shippingDetails.address}`);
  requestData.append(
    "awbRecipient[county]",
    shippingDetails.type === "courier"
      ? await getSamedayCounty(shippingDetails.state, apiToken)
      : shippingDetails.locker
  );
  requestData.append(
    "awbRecipient[city]",
    shippingDetails.type === "courier"
      ? await getSamedayCity(shippingDetails.city, apiToken)
      : shippingDetails.locker
  );
  requestData.append("awbRecipient[email]", `${shippingDetails.email}`);
  requestData.append("parcels[0][weight]", 1);
  requestData.append("parcels[0][isLast]", 1);

  const reqHeaders = new Headers();
  reqHeaders.append("X-AUTH-TOKEN", apiToken);

  const options = {
    method: "POST",
    headers: reqHeaders,
    body: requestData,
  };

  console.log("Request data - ", requestData);

  const response = await fetch(
    process.env.NEXT_PUBLIC_SAMEDAY_API_GENERATE_AWB_URL,
    options
  );

  console.log("AWB response - ", await response.json());
  if (response.ok) {
    const body = await response.json();
    console.log("AWB - ", JSON.stringify(body, null, 2));
  }

  return null;
};

export default generateSamedayAwb;

// ResponseEasybox = {
//   awbNumber: "1ONBLS222309190",
//   awbCost: 11.18,
//   parcels: [
//     {
//       position: 1,
//       awbNumber: "1ONBLS222309190001",
//     },
//   ],
//   pdfLink: "https://api.sameday.ro/api/awb/download/1ONBLS222309190",
//   pickupLogisticLocation: "B_MOGOSOAIA_A01",
//   deliveryLogisticLocation: "B_SEMA_2H_A03",
//   deliveryLogisticCircle: "Resedinta",
//   sortingHub: "B_HUB_H01",
//   sortingHubId: 4,
//   deliveryLogisticLocationId: 3,
//   pickupLogisticLocationId: 1,
// };

// ResponseCourier = {
//   awbNumber: "1ONB24222308781",
//   awbCost: 16.21,
//   parcels: [
//     {
//       position: 1,
//       awbNumber: "1ONB24222308781001",
//     },
//   ],
//   pdfLink: "https://api.sameday.ro/api/awb/download/1ONB24222308781",
//   pickupLogisticLocation: "B_MOGOSOAIA_A01",
//   deliveryLogisticLocation: "CT_CONSTANTA_A01",
//   deliveryLogisticCircle: "Resedinta",
//   sortingHub: "B_HUB_H01",
//   sortingHubId: 4,
//   deliveryLogisticLocationId: 27,
//   pickupLogisticLocationId: 1,
// };

const basic = require("basic-authorization-header");

export const estimateDhlCost = async (data) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const day = String(tomorrow.getDate()).padStart(2, "0");

  const formData = {
    accountNumber: process.env.DHL_CUSTOMER_CODE,
    originCountryCode: "RO",
    originPostalCode: "010562",
    originCityName: "Bucharest",
    destinationCountryCode: data.countryKey,
    destinationPostalCode: data.postalCode,
    destinationCityName: data.city,
    weight: 1,
    length: 10,
    width: 10,
    height: 5,
    plannedShippingDate: `${year}-${month}-${day}`,
    isCustomsDeclarable: false,
    unitOfMeasurement: "metric",
  };

  const options = {
    method: "GET",
    headers: {
      "Webstore-Platform-Name": "Renadyl Europe",
      Authorization: basic(
        process.env.NEXT_PUBLIC_DHL_API_KEY,
        process.env.NEXT_PUBLIC_DHL_API_SECRET
      ),
    },
  };

  const url = new URL(process.env.DHL_API_ESTIMATE_COST_URL);

  Object.keys(formData).forEach((key) => {
    if (formData[key] !== "") {
      url.searchParams.append(key, formData[key]);
    }
  });

  const response = await fetch(url, options);
  if (response.ok) {
    const body = await response.json();

    let dhlProductData;

    for (let i = 0; i < body.products.length; i++) {
      if (body.products[i].productCode === "U") {
        dhlProductData = body.products[i];
      }
    }

    return dhlProductData?.totalPrice;
  } else {
    console.log(await response.json());
    return null;
  }
};

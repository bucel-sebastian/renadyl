import Database from "../Database";
const basic = require("basic-authorization-header");

const generateDhlAwb = async (data) => {
  const database = new Database();

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const day = String(tomorrow.getDate()).padStart(2, "0");
  const hours = String(tomorrow.getHours()).padStart(2, "0");
  const minutes = String(tomorrow.getMinutes()).padStart(2, "0");
  const seconds = String(tomorrow.getSeconds()).padStart(2, "0");
  var timeZoneOffset = tomorrow.getTimezoneOffset();
  const timeZoneSign = timeZoneOffset > 0 ? "-" : "+";
  timeZoneOffset = Math.abs(timeZoneOffset);
  var timeZoneHours = String(Math.floor(timeZoneOffset / 60)).padStart(2, "0");
  var timeZoneMinutes = String(timeZoneOffset % 60).padStart(2, "0");

  var formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}GMT${timeZoneSign}${timeZoneHours}:${timeZoneMinutes}`;

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Webstore-Platform-Name": "Renadyl Europe",
      Authorization: basic(
        process.env.NEXT_PUBLIC_DHL_API_KEY,
        process.env.NEXT_PUBLIC_DHL_API_SECRET
      ),
    },
    body: JSON.stringify({
      plannedShippingDateAndTime: formattedDate,
      pickup: {
        isRequested: false,
        pickupDetails: {
          postalAddress: {
            postalCode: "010562",
            cityName: "Bucuresti",
            countryCode: "RO",
            addressLine1: "Calea Dorobantilor 111-131 Bl:9A",
            countyName: "Bucuresti",
            countryName: "Romania",
          },
          contactInformation: {
            phone: "+40733566000",
            companyName: "HEALTHY MEDICAL S.R.L.",
            fullName: "Cristian Tanasescu",
          },
          registrationNumbers: [
            {
              number: "43590495",
              typeCode: "VAT",
              issuerCountryCode: "RO",
            },
          ],
        },
      },
      productCode: "U",
      getRateEstimates: true,
      accounts: [
        {
          typeCode: "shipper",
          number: process.env.DHL_CUSTOMER_CODE,
        },
      ],
      outputImageProperties: {
        imageOptions: [
          {
            typeCode: "waybill",
            fitLabelsToA4: true,
          },
        ],
      },
      customerDetails: {
        shipperDetails: {
          postalAddress: {
            postalCode: "010562",
            cityName: "Bucuresti",
            countryCode: "RO",
            addressLine1: "Calea Dorobantilor 111-131 Bl:9A",
            countyName: "Bucuresti",
            countryName: "Romania",
          },
          contactInformation: {
            phone: "+40733566000",
            companyName: "HEALTHY MEDICAL S.R.L.",
            fullName: "Cristian Tanasescu",
          },
          registrationNumbers: [
            {
              number: "43590495",
              typeCode: "VAT",
              issuerCountryCode: "RO",
            },
          ],
        },
        receiverDetails: {
          postalAddress: {
            postalCode: data.shippingDetails.postalCode,
            cityName: data.shippingDetails.city,
            countryCode: data.shippingDetails.countryKey,
            addressLine1: data.shippingDetails.address,
            countyName: data.shippingDetails.state,
            countryName: data.shippingDetails.country,
          },
          contactInformation: {
            email: data.billingDetails.email,
            phone: data.billingDetails.phone,
            companyName:
              data.billingDetails.companyName.length === 0
                ? "-"
                : data.billingDetails.companyName,
            fullName: `${data.billingDetails.lname} ${data.billingDetails.fname}`,
          },
        },
      },
      content: {
        packages: [
          {
            weight: 1,
            dimensions: {
              length: 10,
              width: 10,
              height: 5,
            },
          },
        ],
        isCustomsDeclarable: false,
        description: `Order no. ${data.orderData.id} shipping package`,
        unitOfMeasurement: "metric",
      },
    }),
  };

  const response = await fetch(process.env.DHL_API_GENERATE_AWB_URL, options);
  console.log("response - ", response);
  const body = await response.json();
  console.log("body - ", body);
  if (response.ok) {
    return body;
  }
  return null;
};

export default generateDhlAwb;

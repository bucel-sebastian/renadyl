import Database from "../Database";
const basic = require("basic-authorization-header");

const generateDhlAwb = async (data) => {
  const database = new Database();

  console.log("awb data ", data);

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
    body: {
      plannedShippingDateAndTime: formattedDate,
      pickup: {
        isRequested: true,
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
            email: "",
            phone: "+40733566000",
            companyName: "HEALTHY MEDICAL S.R.L.",
            fullName: "Cristian Tanasescu",
          },
          registrationNumbers: {
            typeCode: "VAT",
            number: "43590495",
            issuerCountryCode: "RO",
          },
        },
      },
      productCode: "U",
      accounts: {
        typeCode: "shipper",
        number: "410968613",
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
            email: "",
            phone: "+40733566000",
            companyName: "HEALTHY MEDICAL S.R.L.",
            fullName: "Cristian Tanasescu",
          },
          registrationNumbers: {
            typeCode: "VAT",
            number: "43590495",
            issuerCountryCode: "RO",
          },
        },
        receiverDetails: {
          postalAddress: {
            postalCode: "900294",
            cityName: "Constanta",
            countryCode: "Ro",
            addressLine1: "Alee. Solidaritatii nr. 9 bl.c, sc.a, ap. 10",
            countyName: "Constanta",
            countryName: "Romania",
          },
          contactInformation: {
            email: "",
            phone: "0774689080",
            companyName: "Seqbyte Solutions",
            fullName: "Ion Sebastian Bucel",
          },
        },
      },
      content: {
        packages: {
          weight: 1,
          dimensions: {
            length: 1,
            width: 1,
            height: 1,
          },
        },
      },
    },
  };

  console.log("options - ", options);

  const response = await fetch(process.env.DHL_API_GENERATE_AWB_URL, options);
  console.log("response - ", response);
  const body = await response.json();
  console.log("body - ", body);
  if (response.ok) {
    //   return body;
  }
  return null;
};

export default generateDhlAwb;

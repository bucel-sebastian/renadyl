import Database from "../Database";
import { getProductData } from "./getProductData";

// const index = require("../netopia/index.js");

export const checkIfIDExists = async (id) => {
  const database = new Database();
  const where = new Object();
  where["id"] = id;
  const result = await database.select("renadyl_orders", where);
  return result.length > 0;
};

export const generateRandomCode = (length) => {
  const digits = "0123456789";
  let randomCode = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    randomCode += digits.charAt(randomIndex);
  }
  return randomCode;
};

const generateUniqID = async () => {
  let uniqId;
  do {
    uniqId = "order" + generateRandomCode(10);
  } while (await checkIfIDExists(uniqId));
  return uniqId;
};

export const sendOrderToDatabase = async (formData) => {
  const database = new Database();
  const values = new Object();

  console.log(formData);

  values["date"] = new Date().toISOString();

  values["id"] = await generateUniqID();
  values["status"] = "1";

  for (const item of formData.cart) {
    const data = await getProductData(item.productName);

    const price = JSON.parse(data[0].price);
    const on_sale = JSON.parse(data[0].on_sale);
    const sale_price = JSON.parse(data[0].sale_price);

    if (on_sale) {
      item.price =
        formData.checkoutData.countryCode === "RO"
          ? sale_price.nat
          : sale_price.int;
    } else {
      item.price =
        formData.checkoutData.countryCode === "RO" ? price.nat : price.int;
    }

    item.lotNumber = "";
    item.expDate = "";
  }

  values["cart"] = JSON.stringify(formData.cart);

  values["doctor"] = formData.checkoutData.doctor;
  values["currency"] = formData.checkoutData.currency;
  values["country_code"] = formData.checkoutData.countryCode;
  values["payment"] = formData.checkoutData.payment;

  values["client_details"] = {
    isLoggedIn: formData.checkoutData.isLoggedIn,
    clientId:
      formData.checkoutData.isLoggedIn === true
        ? formData.checkoutData.clientId
        : "",
  };
  values["shipping_details"] = {
    address: formData.checkoutData.shipping.address,
    city: formData.checkoutData.shipping.city,
    cityKey: formData.checkoutData.shipping.cityKey,
    country: formData.checkoutData.shipping.country,
    countryKey: formData.checkoutData.shipping.countryKey,
    email: formData.checkoutData.shipping.email,
    fname: formData.checkoutData.shipping.fname,
    lname: formData.checkoutData.shipping.lname,
    phone: formData.checkoutData.shipping.phone,
    postalCode: formData.checkoutData.shipping.postalCode,
    state: formData.checkoutData.shipping.state,
    stateKey: formData.checkoutData.shipping.stateKey,
    type: formData.checkoutData.shipping.type,
    provider: formData.checkoutData.shipping.provider,
  };
  values["billing_details"] = {
    address: formData.checkoutData.billing.asShipping
      ? formData.checkoutData.shipping.address
      : formData.checkoutData.billing.address,
    city: formData.checkoutData.billing.asShipping
      ? formData.checkoutData.shipping.city
      : formData.checkoutData.billing.city,
    cityKey: formData.checkoutData.billing.asShipping
      ? formData.checkoutData.shipping.cityKey
      : formData.checkoutData.billing.cityKey,
    country: formData.checkoutData.billing.asShipping
      ? formData.checkoutData.shipping.country
      : formData.checkoutData.billing.country,
    countryKey: formData.checkoutData.billing.asShipping
      ? formData.checkoutData.shipping.countryKey
      : formData.checkoutData.billing.countryKey,
    email: formData.checkoutData.billing.asShipping
      ? formData.checkoutData.shipping.email
      : formData.checkoutData.billing.email,
    entity: formData.checkoutData.billing.asShipping
      ? "pf"
      : formData.checkoutData.billing.entity,
    fname: formData.checkoutData.billing.asShipping
      ? formData.checkoutData.shipping.fname
      : formData.checkoutData.billing.fname,
    lname: formData.checkoutData.billing.asShipping
      ? formData.checkoutData.shipping.lname
      : formData.checkoutData.billing.lname,
    phone: formData.checkoutData.billing.asShipping
      ? formData.checkoutData.shipping.phone
      : formData.checkoutData.billing.phone,
    postalCode: formData.checkoutData.billing.asShipping
      ? formData.checkoutData.shipping.postalCode
      : formData.checkoutData.billing.postalCode,
    state: formData.checkoutData.billing.asShipping
      ? formData.checkoutData.shipping.state
      : formData.checkoutData.billing.state,
    stateKey: formData.checkoutData.billing.asShipping
      ? formData.checkoutData.shipping.stateKey
      : formData.checkoutData.billing.stateKey,
    companyCif: formData.checkoutData.billing.asShipping
      ? ""
      : formData.checkoutData.billing.entity === "pj"
      ? formData.checkoutData.billing.companyCif
      : "",
    companyName: formData.checkoutData.billing.asShipping
      ? ""
      : formData.checkoutData.billing.entity === "pj"
      ? formData.checkoutData.billing.companyName
      : "",
  };

  values["promo_code"] = formData.checkoutData.promocode;
  values["order_total"] = formData.summaryData.orderTotal;
  values["products_total"] = formData.summaryData.productsTotal;
  values["vat_procent"] = formData.summaryData.vatProcent;
  values["vat_total"] = formData.summaryData.vatTotal;
  values["shipping_total"] = formData.summaryData.shippingTotal;
  values["promo_total"] = formData.summaryData.promoTotal;

  // console.log("Values - ", values);

  // console.log("values", values);
  // return false;

  const response = await database.insert("renadyl_orders", values);

  return response;
};

const obj = {
  cart: [{ productName: "renal_single", quantity: 1 }],
  checkoutData: {
    currency: "RON",
    countryCode: "RO",
    promocode: null,
    isLoggedIn: false,
    shipping: {
      address: "str nr.",
      city: "Constanţa",
      cityKey: "93595",
      country: "Romania",
      countryKey: "RO",
      email: "bucel.ionsebastian@gmail.com",
      fname: "Ion-Sebastian",
      lname: "Ion-Sebastian",
      password: "",
      phone: "+40 774 689 080",
      postalCode: "900294",
      rePassword: "",
      state: "Constanța ",
      stateKey: "CT",
      type: "courier",
      provider: "Sameday",
    },
    billing: {
      asShipping: false,
      address: "asdfasdf asdfadsf",
      city: "Bucharest",
      cityKey: "90347",
      country: "Romania",
      countryKey: "RO",
      email: "bucel.ionsebastian@gmail.com",
      entity: "pj",
      fname: "Ion-Sebastian",
      lname: "Bucel",
      phone: "+40 774 689 080",
      postalCode: "900294",
      state: "Bucharest",
      stateKey: "B",
      companyCif: "48945873",
      companyName: "sdfgsdfg",
    },
    doctor: "DR TESTESCU",
    payment: "card",
  },
  summaryData: {
    productsTotal: 460,
    productsTotalWithoutVat: 418.6,
    productsSaleTotal: 130,
    vatProcent: 9,
    vatTotal: 41.4,
    shippingTotal: 17,
    promoTotal: 0,
    orderTotal: 477,
  },
};

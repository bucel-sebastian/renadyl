import Database from "../Database";
import { handleRegister } from "../user/auth/register";
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
    uniqId = "rnd" + generateRandomCode(10);
  } while (await checkIfIDExists(uniqId));
  return uniqId;
};

export const sendOrderToDatabase = async (formData) => {
  const database = new Database();
  const values = new Object();

  console.log(jJSON.stringify(formData, null, 2));

  values["date"] = new Date().toISOString();

  values["id"] = await generateUniqID();
  values["status"] = "1";

  for (const item of formData.cart) {
    const data = await getProductData(item.productName);

    const price = data[0].price;
    const on_sale = data[0].on_sale;
    const sale_price = data[0].sale_price;

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

  if (formData?.userData?.user?.id !== null) {
    values["client_id"] = formData?.userData?.user?.id;
  } else {
    values["client_id"] = null;
  }

  values["cart"] = JSON.stringify(formData.cart);

  values["doctor"] = {
    id: null,
    doctor_name: null,
    client: formData.checkoutData.doctor,
  };
  values["currency"] = formData.checkoutData.currency;
  values["country_code"] = formData.checkoutData.countryCode;
  values["payment"] = formData.checkoutData.payment;

  console.log("order data - ", formData);

  if (formData.checkoutData.shipping.savedData === null) {
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
      locker: formData.checkoutData.shipping.locker,
      provider: formData.checkoutData.shipping.provider,
    };

    if (
      formData?.checkoutData?.shipping?.save === true &&
      formData?.userData?.user?.id !== null
    ) {
      const shippingValues = new Object();
      shippingValues["f_name"] = formData.checkoutData.shipping.fname;
      shippingValues["l_name"] = formData.checkoutData.shipping.lname;
      shippingValues["phone"] = formData.checkoutData.shipping.phone;
      shippingValues["email"] = formData.checkoutData.shipping.email;
      shippingValues["country"] = formData.checkoutData.shipping.country;
      shippingValues["country_key"] = formData.checkoutData.shipping.countryKey;
      shippingValues["state"] = formData.checkoutData.shipping.state;
      shippingValues["state_key"] = formData.checkoutData.shipping.stateKey;
      shippingValues["city"] = formData.checkoutData.shipping.city;
      shippingValues["city_key"] = formData.checkoutData.shipping.cityKey;
      shippingValues["postal_code"] = formData.checkoutData.shipping.postalCode;
      shippingValues["address"] = formData.checkoutData.shipping.address;
      shippingValues["date"] = new Date().toISOString();
      shippingValues["client_id"] = formData.userData.user.id;

      const shippingResponse = await database.insert(
        "renadyl_shipping_details",
        shippingValues
      );
    }
  } else {
    const savedShippingDatabaseResponse = await database.select(
      "renadyl_shipping_details",
      {
        id: formData.checkoutData.shipping.savedData,
        client_id: formData.userData.user.id,
      }
    );
    const savedShippingData = await savedShippingDatabaseResponse[0];

    values["shipping_details"] = {
      address: savedShippingData.address,
      city: savedShippingData.city,
      cityKey: savedShippingData.city_key,
      country: savedShippingData.country,
      countryKey: savedShippingData.country_key,
      email: savedShippingData.email,
      fname: savedShippingData.f_name,
      lname: savedShippingData.l_name,
      phone: savedShippingData.phone,
      postalCode: savedShippingData.postal_code,
      state: savedShippingData.state,
      stateKey: savedShippingData.state_key,
      type: formData.checkoutData.shipping.type,
      provider: formData.checkoutData.shipping.provider,
    };
  }

  if (formData.checkoutData.billing.savedData === null) {
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

    if (
      formData?.checkoutData?.billing?.save === true &&
      formData?.userData?.user?.id !== null
    ) {
      const billingValues = new Object();
      billingValues["address"] = formData.checkoutData.billing.asShipping
        ? formData.checkoutData.shipping.address
        : formData.checkoutData.billing.address;
      billingValues["city"] = formData.checkoutData.billing.asShipping
        ? formData.checkoutData.shipping.city
        : formData.checkoutData.billing.city;
      billingValues["city_key"] = formData.checkoutData.billing.asShipping
        ? formData.checkoutData.shipping.cityKey
        : formData.checkoutData.billing.cityKey;
      billingValues["country"] = formData.checkoutData.billing.asShipping
        ? formData.checkoutData.shipping.country
        : formData.checkoutData.billing.country;
      billingValues["country_key"] = formData.checkoutData.billing.asShipping
        ? formData.checkoutData.shipping.countryKey
        : formData.checkoutData.billing.countryKey;
      billingValues["email"] = formData.checkoutData.billing.asShipping
        ? formData.checkoutData.shipping.email
        : formData.checkoutData.billing.email;
      billingValues["entity"] = formData.checkoutData.billing.asShipping
        ? "pf"
        : formData.checkoutData.billing.entity;
      billingValues["f_name"] = formData.checkoutData.billing.asShipping
        ? formData.checkoutData.shipping.fname
        : formData.checkoutData.billing.fname;
      billingValues["l_name"] = formData.checkoutData.billing.asShipping
        ? formData.checkoutData.shipping.lname
        : formData.checkoutData.billing.lname;
      billingValues["phone"] = formData.checkoutData.billing.asShipping
        ? formData.checkoutData.shipping.phone
        : formData.checkoutData.billing.phone;
      billingValues["postal_code"] = formData.checkoutData.billing.asShipping
        ? formData.checkoutData.shipping.postalCode
        : formData.checkoutData.billing.postalCode;
      billingValues["state"] = formData.checkoutData.billing.asShipping
        ? formData.checkoutData.shipping.state
        : formData.checkoutData.billing.state;
      billingValues["state_key"] = formData.checkoutData.billing.asShipping
        ? formData.checkoutData.shipping.stateKey
        : formData.checkoutData.billing.stateKey;
      billingValues["company_cui"] = formData.checkoutData.billing.asShipping
        ? ""
        : formData.checkoutData.billing.entity === "pj"
        ? formData.checkoutData.billing.companyCif
        : "";
      billingValues["company_name"] = formData.checkoutData.billing.asShipping
        ? ""
        : formData.checkoutData.billing.entity === "pj"
        ? formData.checkoutData.billing.companyName
        : "";
      billingValues["date"] = new Date().toISOString();
      billingValues["client_id"] = formData.userData.user.id;

      const billingResponse = await database.insert(
        "renadyl_billing_details",
        billingValues
      );
    }
  } else {
    const savedBillingDatabaseResponse = await database.select(
      "renadyl_billing_details",
      {
        id: formData.checkoutData.billing.savedData,
        client_id: formData.userData.user.id,
      }
    );
    const savedBillingData = await savedBillingDatabaseResponse[0];

    values["billing_details"] = {
      address: savedBillingData.address,
      city: savedBillingData.city,
      cityKey: savedBillingData.city_key,
      countryKey: savedBillingData.country_key,
      country: savedBillingData.country,
      email: savedBillingData.email,
      entity: savedBillingData.entity,
      fname: savedBillingData.f_name,
      lname: savedBillingData.l_name,
      phone: savedBillingData.phone,
      postalCode: savedBillingData.postal_code,
      state: savedBillingData.state,
      stateKey: savedBillingData.state_key,
      companyCif: savedBillingData.company_cui,
      companyName: savedBillingData.company_name,
    };
  }

  // values["billing_details"] = {
  //   address: formData.checkoutData.billing.asShipping
  //     ? formData.checkoutData.shipping.address
  //     : formData.checkoutData.billing.address,
  //   city: formData.checkoutData.billing.asShipping
  //     ? formData.checkoutData.shipping.city
  //     : formData.checkoutData.billing.city,
  //   cityKey: formData.checkoutData.billing.asShipping
  //     ? formData.checkoutData.shipping.cityKey
  //     : formData.checkoutData.billing.cityKey,
  //   country: formData.checkoutData.billing.asShipping
  //     ? formData.checkoutData.shipping.country
  //     : formData.checkoutData.billing.country,
  //   countryKey: formData.checkoutData.billing.asShipping
  //     ? formData.checkoutData.shipping.countryKey
  //     : formData.checkoutData.billing.countryKey,
  //   email: formData.checkoutData.billing.asShipping
  //     ? formData.checkoutData.shipping.email
  //     : formData.checkoutData.billing.email,
  //   entity: formData.checkoutData.billing.asShipping
  //     ? "pf"
  //     : formData.checkoutData.billing.entity,
  //   fname: formData.checkoutData.billing.asShipping
  //     ? formData.checkoutData.shipping.fname
  //     : formData.checkoutData.billing.fname,
  //   lname: formData.checkoutData.billing.asShipping
  //     ? formData.checkoutData.shipping.lname
  //     : formData.checkoutData.billing.lname,
  //   phone: formData.checkoutData.billing.asShipping
  //     ? formData.checkoutData.shipping.phone
  //     : formData.checkoutData.billing.phone,
  //   postalCode: formData.checkoutData.billing.asShipping
  //     ? formData.checkoutData.shipping.postalCode
  //     : formData.checkoutData.billing.postalCode,
  //   state: formData.checkoutData.billing.asShipping
  //     ? formData.checkoutData.shipping.state
  //     : formData.checkoutData.billing.state,
  //   stateKey: formData.checkoutData.billing.asShipping
  //     ? formData.checkoutData.shipping.stateKey
  //     : formData.checkoutData.billing.stateKey,
  //   companyCif: formData.checkoutData.billing.asShipping
  //     ? ""
  //     : formData.checkoutData.billing.entity === "pj"
  //     ? formData.checkoutData.billing.companyCif
  //     : "",
  //   companyName: formData.checkoutData.billing.asShipping
  //     ? ""
  //     : formData.checkoutData.billing.entity === "pj"
  //     ? formData.checkoutData.billing.companyName
  //     : "",
  // };

  if (formData?.checkoutData?.shipping?.wantsAccount === true) {
    const accountValues = new Object();

    accountValues["password"] = formData?.checkoutData?.shipping?.password;
    accountValues["re_password"] = formData?.checkoutData?.shipping?.rePassword;
    accountValues["l_name"] = formData?.checkoutData?.shipping?.lname;
    accountValues["f_name"] = formData?.checkoutData?.shipping?.fname;
    accountValues["email"] = formData?.checkoutData?.shipping?.email;
    accountValues["tc"] = true;

    const registerResponse = await handleRegister(accountValues);
    values["client_id"] = registerResponse.clientId;
  }

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
  cart: [
    {
      productName: "renal_single",
      quantity: 1,
      price: 460,
      lotNumber: "",
      expDate: "",
    },
  ],
  checkoutData: {
    currency: "RON",
    countryCode: "RO",
    promocode: null,
    isLoggedIn: false,
    shipping: {
      address: "",
      city: "",
      cityKey: "",
      country: "Romania",
      countryKey: "RO",
      email: "bucel.ionsebastian@gmail.com",
      fname: "Ion-Sebastian",
      lname: "Bucel",
      password: "",
      phone: "+40 774 689 080",
      postalCode: "900294",
      rePassword: "",
      state: "",
      stateKey: "",
      save: false,
      savedData: null,
      type: "easybox",
      locker: [Object],
      wantsAccount: false,
      provider: "Sameday",
    },
    billing: {
      asShipping: true,
      address: "",
      city: "",
      cityKey: "",
      country: "",
      countryKey: "",
      email: "",
      entity: "",
      fname: "",
      lname: "",
      phone: "",
      save: false,
      savedData: null,
      postalCode: "",
      state: "",
      stateKey: "",
      companyName: "",
      companyCif: "",
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
    shippingTotal: 12,
    promoTotal: 0,
    orderTotal: 472,
  },
  userData: null,
  locale: "ro",
};

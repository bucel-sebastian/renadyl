import Database from "../Database";
import { getRequest } from "../netopia";

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

  values["date"] = new Date().toISOString();

  values["id"] = await generateUniqID();
  values["doctor"] = formData.checkoutData.doctor;
  values["client_details"] = {
    fname: formData.checkoutData.shipping.fname,
    lname: formData.checkoutData.shipping.lname,
    phone: formData.checkoutData.shipping.phone,
    email: formData.checkoutData.shipping.email,
  };
  values["shipping_details"] = {
    type: formData.checkoutData.shipping.type,
    shippingService: formData.checkoutData.shipping.shippingService,
    fname: formData.checkoutData.shipping.fname,
    lname: formData.checkoutData.shipping.lname,
    phone: formData.checkoutData.shipping.phone,
    email: formData.checkoutData.shipping.email,
    country: formData.checkoutData.shipping.country,
    state: formData.checkoutData.shipping.state,
    city: formData.checkoutData.shipping.city,
    postalCode: formData.checkoutData.shipping.postalCode,
    address: formData.checkoutData.shipping.address,
    easybox: formData.checkoutData.shipping.easybox,
  };
  values["billing_details"] = formData.checkoutData.billing.sameAsShipping
    ? {
        fname: formData.checkoutData.shipping.fname,
        lname: formData.checkoutData.shipping.lname,
        phone: formData.checkoutData.shipping.phone,
        email: formData.checkoutData.shipping.email,
        country: formData.checkoutData.shipping.country,
        state: formData.checkoutData.shipping.state,
        city: formData.checkoutData.shipping.city,
        postalCode: formData.checkoutData.shipping.postalCode,
        address: formData.checkoutData.shipping.address,
      }
    : {
        pf: formData.checkoutData.billing.pf,
        fname: formData.checkoutData.billing.fname,
        lname: formData.checkoutData.billing.lname,
        phone: formData.checkoutData.billing.phone,
        email: formData.checkoutData.billing.email,
        country: formData.checkoutData.billing.country,
        state: formData.checkoutData.billing.state,
        city: formData.checkoutData.billing.city,
        postalCode: formData.checkoutData.billing.postalCode,
        address: formData.checkoutData.billing.address,
        companyName: formData.checkoutData.billing.companyName,
        companyCif: formData.checkoutData.billing.companyCif,
      };

  values["product_quantity"] = formData.cartQuantity;
  values["product_price"] = formData.checkoutData.order.productData.onSale
    ? formData.checkoutData.order.productData.salePrice
    : formData.checkoutData.order.productData.price;
  values["currency"] = formData.checkoutData.order.productData.currency;
  values["is_bundle"] = formData.orderData.promo.bundle > 0 ? true : false;
  values["product_totals"] = formData.orderData.products;
  values["order_promotion"] = formData.orderData.promo;
  values["order_total"] = formData.orderData.total;
  values["promo_code"] = formData.promocodeData.code;
  values["promo_code_details"] = formData.promocodeData;
  values["status"] = "1";

  console.log("values", values);

  const response = await database.insert("renadyl_orders", values);
  console.log("db response - ", response);

  // console.log("netopia - ", getRequest(values["id"]));
  return 0;
  // const getNetopiaData = getRequest(values["id"]);
  // console.log("netopia - ", getRequest(values["id"]));
  // return getNetopiaData;
};

const obj = {
  orderData: {
    total: 1634,
    products: 1840,
    shipping: 0,
    promo: {
      bundle: 120,
      promocode: 86,
    },
  },
  checkoutData: {
    doctor: "test",
    shipping: {
      type: "courier",
      shippingService: "",
      fname: "Ion-Sebastian",
      lname: "Bucel",
      phone: "+40 774 689 080",
      email: "bucel.ionsebastian@gmail.com",
      country: "Belgium",
      state: "Brussels-Capital Region",
      city: "Brussels",
      postalCode: "900294",
      address: "str nr.",
      wantsAccount: false,
      password: "",
      rePassword: "",
      easybox: "",
    },
    billing: {
      sameAsShipping: true,
      pf: true,
      type: "",
      fname: "",
      lname: "",
      companyName: "",
      companyCif: "",
      phone: "",
      email: "",
      country: "",
      state: "",
      city: "",
      postalCode: "",
      address: "",
    },
    order: {
      productData: {
        currency: "RON",
        price: "590",
        onSale: true,
        salePrice: "460",
        salePercentage: false,
        saleValue: "130",
        bundleSaleValue: "30",
        bundleQuantity: 3,
        bundlePercentage: false,
      },
      shippingService: "",
      shippingCost: "",
      productsCost: "",
    },
  },
  promocodeData: {
    code: "test",
    user_id: "user123",
    value: "5",
  },
  cartQuantity: 4,
};

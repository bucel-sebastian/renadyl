"use strict";

module.exports = {
  getRequest: getRequest,
  decodeResponse: decodeResponse,
};

const crypto = require("crypto");

const rc4 = require("./encrypt.js");
const fs = require("fs");
const path = require("path");

const filePathPrivate = path.join(
  process.cwd(),
  "utils/frontpages/netopia/sandbox.2VZR-GOQH-7A8W-VLRB-UOOWprivate.key"
);
const filePathPublic = path.join(
  process.cwd(),
  "utils/frontpages/netopia/sandbox.2VZR-GOQH-7A8W-VLRB-UOOW.public.cer"
);

const privateKey = fs.readFileSync(filePathPrivate).toString();
const publicKey = fs.readFileSync(filePathPublic).toString();
const xml2js = require("xml2js");
var builder = new xml2js.Builder({
  cdata: true,
});
var parser = new xml2js.Parser({
  explicitArray: false,
});
function getPayment(orderId, amount, currency, orderData, locale) {
  let date = new Date();
  console.log("Order data - ", orderData);

  const data = {
    order: {
      $: {
        id: orderId,
        timestamp: date.getTime(),
        type: "card",
      },
      signature: "2VZR-GOQH-7A8W-VLRB-UOOW",
      url: {
        return:
          locale === "ro"
            ? `https://renadyleurope.com/order-placed`
            : `https://renadyleurope.com/${locale}/order-placed`,
        confirm: "https://renadyleurope.com/api/confirm-payment",
      },
      invoice: {
        $: {
          currency: currency === "EURO" ? "EUR" : "RON",
          amount: amount,
        },
        details: "Plata Renadyl",
        contact_info: {
          billing: {
            $: {
              type: orderData.checkoutData.billing.pf ? "person" : "company",
            },
            first_name: orderData.checkoutData.billing.sameAsShipping
              ? orderData.checkoutData.shipping.fname
              : orderData.checkoutData.billing.pf
              ? orderData.checkoutData.billing.fname
              : orderData.checkoutData.billing.companyName,
            last_name: orderData.checkoutData.billing.sameAsShipping
              ? orderData.checkoutData.shipping.lname
              : orderData.checkoutData.billing.pf
              ? orderData.checkoutData.billing.lname
              : orderData.checkoutData.billing.companyCif,
            address: orderData.checkoutData.billing.sameAsShipping
              ? `${orderData.checkoutData.shipping.address}, ${orderData.checkoutData.shipping.postalCode}, ${orderData.checkoutData.shipping.city}, ${orderData.checkoutData.shipping.state}, ${orderData.checkoutData.shipping.country} `
              : `${orderData.checkoutData.billing.address}, ${orderData.checkoutData.billing.postalCode}, ${orderData.checkoutData.billing.city}, ${orderData.checkoutData.billing.state}, ${orderData.checkoutData.billing.country} `,
            email: orderData.checkoutData.billing.sameAsShipping
              ? orderData.checkoutData.shipping.email
              : orderData.checkoutData.billing.email,
            mobile_phone: orderData.checkoutData.billing.sameAsShipping
              ? orderData.checkoutData.shipping.phone
              : orderData.checkoutData.billing.phone,
          },
          shipping: {
            $: {
              type: "person",
            },
            first_name: orderData.checkoutData.shipping.fname,
            last_name: orderData.checkoutData.shipping.lname,
            address: `${orderData.checkoutData.shipping.address}, ${orderData.checkoutData.shipping.postalCode}, ${orderData.checkoutData.shipping.city}, ${orderData.checkoutData.shipping.state}, ${orderData.checkoutData.shipping.country} `,
            email: orderData.checkoutData.shipping.email,
            mobile_phone: orderData.checkoutData.shipping.phone,
          },
        },
      },
      ipn_cipher: "aes-256-cbc",
    },
  };

  // const data = {
  //   order: {
  //     $: {
  //       id: orderId,
  //       timestamp: date.getTime(),
  //       type: "card",
  //     },
  //     signature: "2VZR-GOQH-7A8W-VLRB-UOOW",
  //     url: {
  //       return: "<your_return_URL>",
  //       confirm: "<your_confirm_URL>",
  //     },
  //     invoice: {
  //       $: {
  //         currency: currency,
  //         amount: amount,
  //       },
  //       details: "test plata",
  //       contact_info: {
  //         billing: {
  //           $: {
  //             type: "person",
  //           },
  //           first_name: "Test",
  //           last_name: "Test",
  //           address: "strada",
  //           email: "test@mobilpay.ro",
  //           mobile_phone: "mobilePhone",
  //         },
  //         shipping: {
  //           $: {
  //             type: "person",
  //           },
  //           first_name: "Test",
  //           last_name: "Test",
  //           address: "strada",
  //           email: "test@mobilpay.ro",
  //           mobile_phone: "mobilePhone",
  //         },
  //       },
  //     },
  //     ipn_cipher: "aes-256-cbc",
  //   },
  // };

  return { data, algorithm: "aes-256-cbc" };
}

function removeDiacritics(input) {
  const diacriticsMap = {
    ă: "a",
    â: "a",
    ș: "s",
    ț: "t",
    î: "i",
    ș: "s",
    ă: "a",
    î: "i",
    ș: "s",
    ț: "t",
    â: "a",
    Ă: "A",
    Â: "A",
    Ș: "S",
    Ț: "T",
    Î: "I",
    Ș: "S",
    Ă: "A",
    Î: "I",
    Ș: "S",
    Ț: "T",
    Â: "A",
  };

  return input.replace(
    /[ăâșțîĂÂȘȚÎ]/g,
    (match) => diacriticsMap[match] || match
  );
}

function getRequest(orderId, amount, currency, orderData, locale) {
  const result = getPayment(orderId, amount, currency, orderData, locale);

  let xml = builder.buildObject(result.data);

  let xmlWithoutDiacritics = removeDiacritics(xml);
  return rc4.encrypt(publicKey, xmlWithoutDiacritics, result.algorithm);
}

function decodeResponse(data) {
  return new Promise(function (resolve, reject) {
    parser.parseString(
      rc4.decrypt(privateKey, data.iv, data.env_key, data.data, data.cipher),
      function (err, result) {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
}

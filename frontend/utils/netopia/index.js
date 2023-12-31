"use strict";

module.exports = {
  getRequest: getRequest,
  decodeResponse: decodeResponse,
};

const crypto = require("crypto");

const rc4 = require("./encrypt.js");
const fs = require("fs");
const privateKey = fs
  .readFileSync("live.JM4B-T2Q5-67WU-EEUH-8C4L.public.cer")
  .toString();
const publicKey = fs
  .readFileSync("live.JM4B-T2Q5-67WU-EEUH-8C4L.public.cer")
  .toString();
const xml2js = require("xml2js");
var builder = new xml2js.Builder({
  cdata: true,
});
var parser = new xml2js.Parser({
  explicitArray: false,
});

function getPayment(orderId, amount, currency) {
  let date = new Date();
  return {
    order: {
      $: {
        id: orderId,
        timestamp: date.getTime(),
        type: "card",
      },
      signature: "JM4B-T2Q5-67WU-EEUH-8C4L",
      url: {
        return: "https://www.google.ro",
        confirm: "https://www.google.ro",
      },
      invoice: {
        $: {
          currency: currency,
          amount: amount,
        },
        details: "test plata",
        contact_info: {
          billing: {
            $: {
              type: "person",
            },
            first_name: "Alex",
            last_name: "TheBoss",
            address: "strada fara nume",
            email: "theboss@mobilpay.ro",
            mobile_phone: "mobilePhone",
          },
          shipping: {
            $: {
              type: "person",
            },
            first_name: "Alexandru",
            last_name: "TheBoss",
            address: "strada fara nume",
            email: "theboss@mobilpay.ro",
            mobile_phone: "mobilePhone",
          },
        },
      },
    },
  };
}

function getRequest(orderId) {
  let xml = builder.buildObject(getPayment(orderId, 1, "RON"));
  return rc4.encrypt(publicKey, xml);
}

function decodeResponse(data) {
  return new Promise(function (resolve, reject) {
    parser.parseString(
      rc4.decrypt(privateKey, data.env_key, data.data),
      function (err, result) {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
}

console.log(getRequest(111));

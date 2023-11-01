"use strict";

import crypto from "crypto";
import { encrypt, decrypt } from "./encryptes6";
import xml2js from "xml2js";

const privateKey = `-----BEGIN PRIVATE KEY-----
MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAPWF5TRG+VH3kcWa
cheCdCB/EwUZYFELepVGldTsDIt/w7h9Bi/55+Eq0HjBp9zqMrz90jZh67akEQKb
x1ilA87XkrBKXTvGzyszglz6UbfLhuLg1UfmjJst9cOtwPOAdL30wNewKHv2uJio
wqqolt+OImKm0MO0/+MM/z8n4szPAgMBAAECgYEA8JL6O3cv5TkIBO+Iy7BvyUe6
g0ySK9drjclUFwYUZLwUMzmOToQ4yVECZNCcgsKYZMbwq4jXRmcMo9mwQxOt3Zvc
ukwcwbnhDbUY2pgEr+SMasYzEErg+pJLhLkWCs8tJL+YppV30+i9JT9LelekBwY3
bQmWdbaLv56P+5w7QIECQQD7SmicemdHGwmhEz13nbOynmP0h5nXY3yFYYkKmUSn
R6VpunCD9G3thIBJfFVyg4EDHqOQIMekypTcd8XRAmHJAkEA+h/Q4Hia8EXJA6hf
ATkaasI6R79ZriOUpa82wo7W2jqSGQ1UtujY3n7TuNuE0GjISgYwbhcowabJKEVJ
5gvF1wJAVjYM9cI4tHheMVi8edEs2Vbly/rJmM+U5N21emFi4FEAOumvuFWfcSFI
Me3qEsNy+3MDgmr8k1i9AXZF85LxoQJBALRifaFlWVgu++lHZDzdkc+sg5t6xJJx
1qIm2rc1jH2WAAdRNeczxjOwA8Etj3s+FjRMgmDjEuGWBzyju8fMdcECQQCj/DtM
+b7wtPqMtet6cbf8Mc45vJnvmIpviG/BMYi8dlQFty1gzw/dyn4CLNM47umAVxTR
9JSX2ToP3Qt102qK
-----END PRIVATE KEY-----`;

const publicKey = `-----BEGIN CERTIFICATE-----
MIIC3zCCAkigAwIBAgIBATANBgkqhkiG9w0BAQsFADCBiDELMAkGA1UEBhMCUk8x
EjAQBgNVBAgTCUJ1Y2hhcmVzdDESMBAGA1UEBxMJQnVjaGFyZXN0MRAwDgYDVQQK
EwdORVRPUElBMSEwHwYDVQQLExhORVRPUElBIERldmVsb3BtZW50IHRlYW0xHDAa
BgNVBAMTE25ldG9waWEtcGF5bWVudHMucm8wHhcNMjMwOTI3MTc0NzA1WhcNMzMw
OTI0MTc0NzA1WjCBiDELMAkGA1UEBhMCUk8xEjAQBgNVBAgTCUJ1Y2hhcmVzdDES
MBAGA1UEBxMJQnVjaGFyZXN0MRAwDgYDVQQKEwdORVRPUElBMSEwHwYDVQQLExhO
RVRPUElBIERldmVsb3BtZW50IHRlYW0xHDAaBgNVBAMTE25ldG9waWEtcGF5bWVu
dHMucm8wgZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBALwh0/NhEpZFuKvghZ9N
75CXba05MWNCh422kcfFKbqP5YViCUBg3Mc5ZYd1e0Xi9Ui1QI2Z/jvvchrDZGQw
jarApr3S9bowHEkZH81ZolOoPHBZbYpA28BIyHYRcaTXjLtiBGvjpwuzljmXeBoV
LinIaE0IUpMen9MLWG2fGMddAgMBAAGjVzBVMA4GA1UdDwEB/wQEAwIFoDATBgNV
HSUEDDAKBggrBgEFBQcDATAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBQ9yXCh
MGxzUzQflmkXT1oyIBoetTANBgkqhkiG9w0BAQsFAAOBgQADiCE/psVRTyiDs7Dl
7NVi8weTbF7ZMmozrLINgkSfpSm4FUiCWXqEsh0WAhWZ6x3ZzL1uz2uF7w3EiN3/
+SxOXjduHO7T2483uzRNN09+YwJq9prSSzbX03Aa1HvhawT/aUM5BjbwbcDP7WuF
6BO6/qhCxteaJoIlBx2NDu5GTQ==
-----END CERTIFICATE-----`;

const signature = "2VZR-GOQH-7A8W-VLRB-UOOW";
var builder = new xml2js.Builder({
  cdata: true,
});
var parser = new xml2js.Parser({
  explicitArray: false,
});

function getPayment(orderId, amount, currency, orderData) {
  let date = new Date();
  return {
    order: {
      $: {
        id: orderId,
        timestamp: date.getTime(),
        type: "card",
      },
      signature: signature,
      url: {
        return: "https://www.google.ro",
        confirm: "https://www.google.com",
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

export function getRequest(orderId, amount, currency, orderData) {
  let xml = builder.buildObject(
    getPayment(orderId, amount, currency, orderData)
  );
  return encrypt(publicKey, xml);
}

export function decodeResponse(data) {
  return new Promise(function (resolve, reject) {
    parser.parseString(
      decrypt(privateKey, data.env_key, data.data),
      function (err, result) {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
}

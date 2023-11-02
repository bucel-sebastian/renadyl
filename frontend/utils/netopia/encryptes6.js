"use strict";

import crypto from "crypto";
import rc4 from "arc4";
import { RSA_PKCS1_PADDING } from "constants";

rc4.encrypt = function (publicKey, data) {
  let key = crypto.randomBytes(32);
  var cipher = rc4("arc4", key);
  let encrypted = cipher.encode(data, "binary", "base64");

  let envKey = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: RSA_PKCS1_PADDING,
    },
    key
  );
  console.log("RSA THING ", RSA_PKCS1_PADDING);
  return {
    env_key: envKey.toString("base64"),
    data: encrypted,
  };
};

rc4.decrypt = function (privateKey, envKey, data) {
  let buffer = Buffer.from(envKey, "base64");
  var decrypted = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: RSA_PKCS1_PADDING,
    },
    buffer
  );
  var cipher = rc4("arc4", decrypted);
  let dec = cipher.decode(buffer.from(data, "base64"), "utf8");
  return dec;
};

export default rc4;

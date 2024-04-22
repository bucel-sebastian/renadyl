"use strict";
const crypto = require("crypto");
const rc4 = require("arc4");
const forge = require("node-forge");

const constants = require("constants");
module.exports = {
  encrypt: encrypt,
  decrypt: decrypt,
};

function encrypt(publicKey, data, algorithm) {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(data, "utf8", "base64");
  encrypted += cipher.final("base64");

  const envKey = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    key
  );

  return {
    iv: iv.toString("base64"),
    envKey: envKey.toString("base64"),
    envData: encrypted,
    cipher: algorithm,
  };

  // var cipher = rc4("arc4", key);
  // let encrypted = cipher.encode(data, "binary", "base64");

  // let envKey = crypto.publicEncrypt(
  //   {
  //     key: publicKey,
  //     padding: constants.RSA_PKCS1_PADDING,
  //   },
  //   key
  // );
  // return {
  //   env_key: envKey.toString("base64"),
  //   data: encrypted,
  // };
}

function decrypt(privateKey, iv, envKey, data, cipher) {
  let buffer = Buffer.from(envKey, "base64");

  const privateKeyPem = forge.pki.privateKeyFromPem(privateKey);
  const symmetricKey = Buffer.from(
    privateKeyPem.decrypt(buffer, "RSAES-PKCS1-V1_5"),
    "binary"
  );

  const decipher = crypto.createDecipheriv(
    cipher,
    symmetricKey,
    Buffer.from(iv, "base64")
  );
  let dec = decipher.update(data, "base64", "utf8");
  dec += decipher.final("utf8");

  // var decrypted = crypto.privateDecrypt(
  //   {
  //     key: privateKey,
  //     padding: constants.RSA_PKCS1_PADDING,
  //   },
  //   buffer
  // );
  // var cipher = rc4("arc4", decrypted);
  // let dec = cipher.decode(Buffer.from(data, "base64"), "utf8");
  return dec;
}

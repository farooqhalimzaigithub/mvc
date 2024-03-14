// models/lovModel.js
const crypto = require("crypto");
const axios = require("axios");
const querystring = require("querystring");
const { v4: uuidv4 } = require("uuid");
const secretKey = "0nBB4D1CAA234kA0";
const url =
  "http://bbsanmc.nrspbank.com:808/BbsCoreApis/BBConventional.svc/doactivity";

function getSTN(rawdata) {
  const sha256 = crypto.createHash("sha256");
  const digest = sha256.update(rawdata, "utf8").digest("base64");
  return digest;
}

function encrypt(plainText, key) {
  const keyBytes = Buffer.from(key, "utf8");
  const iv = keyBytes;

  const cipher = crypto.createCipheriv("aes-128-cbc", keyBytes, iv);
  const encrypted = Buffer.concat([
    cipher.update(plainText, "utf8"),
    cipher.final(),
  ]);
  return encrypted.toString("base64");
}

function decrypt(encryptedText, key) {
  const keyBytes = Buffer.from(key, "utf8");
  const iv = keyBytes;

  const encryptedBytes = Buffer.from(encryptedText, "base64");
  const decipher = crypto.createDecipheriv("aes-128-cbc", keyBytes, iv);
  const decrypted = Buffer.concat([
    decipher.update(encryptedBytes),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}

module.exports = {
  getSTN,
  encrypt,
  decrypt,
  // other functions as needed
};

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

function readfile(pemFilePath) {
  try {
    const pemData = fs.readFileSync(path.join(__dirname, pemFilePath), "utf8");
    return pemData;
  } catch (error) {
    console.error("Error reading PEM file:", error);
    throw error;
  }
}

function generateDigitalSignature(data, privateKeypath) {
  const privateKey = readfile(privateKeypath);
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(data);
  return sign.sign(privateKey, "base64");
}

console.log(generateDigitalSignature("21BIT0224", "private.pem"));

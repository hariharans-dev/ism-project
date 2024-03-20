const crypto = require("crypto");
const fs = require("fs");

function readfile(pemFilePath) {
  try {
    const pemData = fs.readFileSync(pemFilePath, "utf8");
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

function verifyDigitalSignature(data, signature, publicKeypath) {
  try {
    const publicKey = readfile(publicKeypath);
    const verify = crypto.createVerify("RSA-SHA256");
    verify.update(data);
    return verify.verify(publicKey, signature, "base64");
  } catch (error) {
    return false;
  }
}

const sign = generateDigitalSignature(
  "21BIT0224",
  "key_authority/key/private.pem"
);

console.log(
  verifyDigitalSignature("21BIT0224", sign, "key_authority/key/public.pem")
);

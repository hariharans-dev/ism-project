const crypto = require("crypto");
async function signadverfy() {
  const message = "hello world";
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  console.log(data);
  // sorry jhu jhu sorry pls manuchuuuuu nee va
  try {
    const { private, public } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
    });
    console.log(private);
  } catch (error) {
    console.log(error);
  }
}
signadverfy();

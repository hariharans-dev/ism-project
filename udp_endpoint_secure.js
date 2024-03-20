const dgram = require("dgram");

const server = dgram.createSocket("udp4");

const {
  verifyIPUDP,
  addattendanceudp,
  add_ip_log,
  verify_message,
} = require("./controller/api_controller");

server.on("message", async (message, remote) => {
  try {
    const msg = JSON.parse(message);
    console.log(msg);
    const valid = await verifyIPUDP(remote.address);
    const status = await verify_message(msg);
    console.log(status);
    const date = new Date();
    if (!valid || !status) {
      add_ip_log(remote.address, "secure reject", message, date);
    } else {
      await addattendanceudp(msg.regno);
      await add_ip_log(remote.address, "secure accept", message, date);
    }
    return "success";
  } catch (error) {
    return "error";
  }
});

server.on("listening", () => {
  const address = server.address();
  console.log(`UDP server listening on ${address.address}:${address.port}`);
});

const PORT = 3000;

server.bind(PORT, "127.0.0.1");

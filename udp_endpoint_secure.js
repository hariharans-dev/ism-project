const dgram = require("dgram");

const udpServer = dgram.createSocket("udp4");

const {
  verifyIPUDP,
  addattendanceudp,
  add_ip_log,
  verify_message,
} = require("./controller/api_controller");

udpServer.on("error", (err) => {
  logger.error(`UDP Server error:\n${err.stack}`);
  udpServer.close();
});

udpServer.on("message", async (message, remote) => {
  try {
    const msg = JSON.parse(message);
    console.log(msg);
    const valid = await verifyIPUDP(remote.address);
    const status = await verify_message(msg);

    const date = new Date();
    if (!valid || !status) {
      const convmsg = JSON.stringify(JSON.parse(message));
      add_ip_log(remote.address, "secure reject", convmsg, date);
    } else {
      await addattendanceudp(msg.regno);
      const convmsg = JSON.stringify(JSON.parse(message));
      await add_ip_log(remote.address, "secure accept", convmsg, date);
    }
    return "success";
  } catch (error) {
    return "error";
  }
});

udpServer.on("listening", () => {
  const address = udpServer.address();
  console.log(address);
});

const UDP_PORT = 4000;

udpServer.bind(UDP_PORT);

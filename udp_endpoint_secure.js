const {
  verifyIPUDP,
  addattendanceudp,
  add_ip_log,
  verify_message,
} = require("./controller/api_controller");

const dgram = require("dgram");

const udpServer = dgram.createSocket("udp4");
const UDP_PORT = 7000;

udpServer.on("error", (err) => {
  udpServer.close();
});

udpServer.on("message", async (message, remote) => {
  try {
    var msg = message.toString("utf-8");

    // Attempt to parse msg
    try {
      var parsedMsg = JSON.parse(msg);
    } catch (error) {
      msg = msg + '"}';
      console.log(msg);
    }

    const data = JSON.parse(msg);
    console.log(data);
    const valid = await verifyIPUDP(remote.address);
    const status = await verify_message(data);

    const date = new Date();
    if (!valid || !status) {
      const convmsg = JSON.stringify(data);
      add_ip_log(remote.address, "secure reject", convmsg, date);
    } else {
      // console.log("secure " + msg.regno);
      await addattendanceudp(data.regno);
      const convmsg = JSON.stringify(data);
      await add_ip_log(remote.address, "secure accept", convmsg, date);
    }
    return "success";
  } catch (error) {
    console.log(error);
    return "error";
  }
});

udpServer.on("listening", () => {
  const address = udpServer.address();
  console.log(
    "Udp-Secure-Server at http://" + address.address + ":" + address.port + "/"
  );
});

udpServer.bind(UDP_PORT);

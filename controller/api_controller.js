const IP = require("./ip_data_controller");
const Attendance = require("./attendance_registery_data_controller");

const { verifyDigitalSignature } = require("../key_authority/digitalsignature");

const ip_object = new IP();
const attendance_object = new Attendance();

const ipv6Toipv4 = (ipv6Address) => {
  const ipv6Regex = /^([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4})$/;
  if (ipv6Address === "::1") {
    return "127.0.0.1";
  }
  if (!ipv6Regex.test(ipv6Address)) {
    return "Invalid IPv6 address";
  }
  const last32Bits = ipv6Address.substr(-8);
  const ipv4Address = [];
  for (let i = 0; i < 8; i += 2) {
    ipv4Address.push(parseInt(last32Bits.substr(i, 2), 16));
  }
  return ipv4Address.join(".");
};

const verifyIPaddr = async (req, res, next) => {
  const sourceIP = req.ip;
  const allowedIPRange = await registered_ip();
  const ipaddr = ipv6Toipv4(sourceIP);
  if (!allowedIPRange.includes(ipaddr)) {
    if (req.url == "/add-attendance") {
    }
    return res
      .status(403)
      .json({ message: "Access Forbidden. Your IP address is not allowed." });
  }
  if (req.url == "/add-attendance") {
  }
  next();
};

const verifyIPUDP = async (sourceIP, message) => {
  const allowedIPRange = await registered_ip();
  if (!allowedIPRange.includes(sourceIP)) {
    return false;
  }
  return true;
};

const addattendanceudp = async (regno) => {
  try {
    const data = { regno: regno };
    await attendance_object.addattendance(data);
    return true;
  } catch (error) {
    return error;
  }
};

const registered_ip = async () => {
  try {
    return await ip_object.findregisteredip();
  } catch (error) {
    return error;
  }
};

const show_remote_ip = (req, res) => {
  return res.send(req.ip);
};

const show_registered_ip = async (req, res) => {
  try {
    const data = await ip_object.findregisteredip();
    return res.status(200).json(data);
  } catch (error) {
    return error;
  }
};

const add_registered_ip = async (req, res) => {
  try {
    const data = { ipaddr: req.body.ipaddr };
    ip_object.addregisteredip(data);
    return res.status(200).json({ message: "registered successful" });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

const deleteregisteredip = (req, res) => {
  try {
    const data = { ipaddr: req.body.ipaddr };
    ip_object.deleteregisteredip(data);
    return res.status(200).json({ message: "delete successful" });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

const show_attendance = async (req, res) => {
  try {
    const data = await attendance_object.findattandance(req.body.regno);
    data.reverse();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

const add_attendance = async (req, res) => {
  try {
    const data = { regno: req.body.regno };
    await attendance_object.addattendance(data);
    return res.status(200).json({ message: "attendance registerd" });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

const show_ip_log = async (req, res) => {
  try {
    var data = await ip_object.findiplogs();
    data.reverse();
    if (req.query.count != null) {
      data = data.slice(0, parseInt(req.query.count));
      return res.status(200).json(data);
    }
    data = data.slice(0, 20);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

const add_ip_log = async (ipaddr, status, payload, time) => {
  try {
    const data = { ip: ipaddr, status: status, payload: payload, time: time };
    await ip_object.addiplog(data);
    return "success";
  } catch (error) {
    return error;
  }
};

const verify_message = async (message) => {
  const regno = message.regno;
  const sign = message.sign;
  return await verifyDigitalSignature(
    regno,
    sign,
    "key_authority/key/public.pem"
  );
};

module.exports = {
  show_registered_ip,
  add_registered_ip,
  show_attendance,
  add_attendance,
  show_ip_log,
  add_ip_log,
  verifyIPaddr,
  verifyIPUDP,
  addattendanceudp,
  verify_message,
  show_remote_ip,
  deleteregisteredip,
};

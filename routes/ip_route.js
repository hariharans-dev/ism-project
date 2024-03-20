const router = require("express").Router();
const { check, validationResult } = require("express-validator");

const {
  show_registered_ip,
  add_registered_ip,
  show_ip_log,
  show_remote_ip,
} = require("../controller/api_controller");

const show_my_ip = [];
router.get("/show-source-ip", show_my_ip, show_remote_ip);

const show_registered_ip_middleware = [];
router.get(
  "/show-registered-ip",
  show_registered_ip_middleware,
  show_registered_ip
);

const validateRequestBody_add_registered_ip = [
  (req, res, next) => {
    const numberOfFields = Object.keys(req.body).length;
    if (numberOfFields == 0) {
      return res.status(400).json({ message: "no feild given" });
    }
    next();
  },
  check("ipaddr").exists().isString(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "not in proper format" });
    }
    next();
  },
];
const add_registered_ip_middleware = [validateRequestBody_add_registered_ip];
router.post(
  "/add-registered-ip",
  add_registered_ip_middleware,
  add_registered_ip
);

const validateRequestBody_show_attendance = [];
const show_attendance_middleware = [validateRequestBody_show_attendance];
router.get("/show-iplogs", show_attendance_middleware, show_ip_log);

module.exports = router;

const router = require("express").Router();
const { check, validationResult } = require("express-validator");

const {
  verifyIPaddr,
  add_attendance,
  show_attendance,
} = require("../../controller/unsecure/api_controller");

const validateRequestBody_show_attendance = [
  (req, res, next) => {
    const numberOfFields = Object.keys(req.body).length;
    if (numberOfFields == 0) {
      return res.status(400).json({ message: "no feild given" });
    }
    next();
  },
  check("regno").exists().isString(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "not in proper format" });
    }
    next();
  },
];
const show_attendance_middleware = [
  validateRequestBody_show_attendance,
  verifyIPaddr,
];
router.post("/show-attendance", show_attendance_middleware, show_attendance);

const validateRequestBody_add_attendance = [
  (req, res, next) => {
    const numberOfFields = Object.keys(req.body).length;
    if (numberOfFields == 0) {
      return res.status(400).json({ message: "no feild given" });
    }
    next();
  },
  check("regno").exists().isString(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "not in proper format" });
    }
    next();
  },
];
const add_attendance_middleware = [
  validateRequestBody_add_attendance,
  verifyIPaddr,
];
router.post("/add-attendance", add_attendance_middleware, add_attendance);

module.exports = router;

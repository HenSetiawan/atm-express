const { body } = require("express-validator");

const registerValidator = [
  body("email")
    .isEmail()
    .withMessage("Email is not valid")
    .notEmpty()
    .withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  body("fullName").notEmpty().withMessage("Fullname is required"),
  body("nik").notEmpty().withMessage("NIK is required"),
  body("address").notEmpty().withMessage("Address is required"),
  body("username").notEmpty().withMessage("Username is required"),
];

const updateValidator = [
  body("email")
    .isEmail()
    .withMessage("Email is not valid")
    .notEmpty()
    .withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  body("fullName").notEmpty().withMessage("Fullname is required"),
  body("nik").notEmpty().withMessage("NIK is required"),
  body("address").notEmpty().withMessage("Address is required"),
  body("username").notEmpty().withMessage("Username is required"),
];

module.exports = { registerValidator, updateValidator };

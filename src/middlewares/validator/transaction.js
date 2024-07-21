const { body } = require("express-validator");

const transferValidator = [
  body("recepientId").notEmpty().withMessage("recepientId is required"),
  body("amount").notEmpty().withMessage("amount is required"),
];

module.exports = { transferValidator };

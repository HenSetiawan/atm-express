const express = require("express");
const transactionRouter = express.Router();
const transactionController = require("../controllers/transactions");
const auth = require("../middlewares/auth");

transactionRouter.get(
  "/transactions",
  auth,
  transactionController.getAllUserTransaction
);

module.exports = transactionRouter;

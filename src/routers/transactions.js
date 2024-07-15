const express = require("express");
const transactionRouter = express.Router();
const transactionController = require("../controllers/transactions");
const auth = require("../middlewares/auth");

transactionRouter.get(
  "/transactions",
  auth,
  transactionController.getAllUserTransaction
);

transactionRouter.post(
    "/deposito",
    auth,
    transactionController.transactionDepositoByUser
  );

module.exports = transactionRouter;

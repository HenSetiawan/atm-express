const express = require("express");
const transactionRouter = express.Router();
const transactionController = require("../controllers/transactions");
const { transferValidator } = require("../middlewares/validator/transaction");
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

transactionRouter.post(
  "/transfer",
  auth,
  transferValidator,
  transactionController.transactionTransferByUser
);

module.exports = transactionRouter;

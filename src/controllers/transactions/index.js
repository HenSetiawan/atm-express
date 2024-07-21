const {
  getTransactionsByUserId,
  transactionDeposito,
  transactionTransfer
} = require("../../services/transaction");
const { validationResult } = require("express-validator");

const getAllUserTransaction = async (req, res) => {
  const userId = req.data.user.id;
  try {
    const allUserTransactions = await getTransactionsByUserId(userId);
    return res.json({ status: "success", data: allUserTransactions });
  } catch (error) {
    return res.status(500).json({ status: "failed", error: error });
  }
};

const transactionTransferByUser = async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const userId = req.data.user.id;
  const recepientId = req.body.recepientId;
  const amount = req.body.amount;

  try {
    const responseTransaction = await transactionTransfer(userId,recepientId,amount)
    return res.json({ status: "success", data:responseTransaction });
  } catch (error) {
    return res.status(500).json({ status: "failed", error: error.message });
  }
}

const transactionDepositoByUser = async (req, res) => {
  const userId = req.data.user.id;
  const amount = req.body.amount;
  try {
    const depositoResult = await transactionDeposito(userId, amount);
    return res.json({data:depositoResult,status:"success"});
  } catch (error) {
    return res.status(500).json({ status: "failed", error: error });
  }
};

module.exports = { getAllUserTransaction, transactionDepositoByUser, transactionTransferByUser };

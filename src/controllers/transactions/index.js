const {
  getTransactionsByUserId,
  transactionDeposito,
} = require("../../services/transaction");

const getAllUserTransaction = async (req, res) => {
  const userId = req.data.user.id;
  try {
    const allUserTransactions = await getTransactionsByUserId(userId);
    return res.json({ status: "success", data: allUserTransactions });
  } catch (error) {
    return res.status(500).json({ status: "failed", error: error });
  }
};

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

module.exports = { getAllUserTransaction, transactionDepositoByUser };

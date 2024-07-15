const { getTransactionsByUserId } = require("../../services/transaction");

const getAllUserTransaction = async (req, res) => {
  const userId = req.data.user.id;
  try {
    const allUserTransactions = await getTransactionsByUserId(userId);
    return res.json({ status: "success", data: allUserTransactions });
  } catch (error) {
    return res.status(500).json({ status: "failed", error: error });
  }
};

module.exports = { getAllUserTransaction };

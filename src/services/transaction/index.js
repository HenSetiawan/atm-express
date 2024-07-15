const { Transactions } = require("../../models");
const { getAccountByUserId } = require("../account/index");

const getTransactionsByUserId = async (id) => {
  try {
    const account = await getAccountByUserId(id);
    const transactions = await Transactions.findAll({
      where: { [Op.or]: [{ senderAccount: account.id }, { recepientAccount: account.id }] },
    });
    return transactions;
  } catch (error) {
    return error;
  }
};

module.exports = { getTransactionsByUserId };

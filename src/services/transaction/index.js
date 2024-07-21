const { Op } = require("sequelize");
const { Transactions } = require("../../models");
const {
  getAccountByUserId,
  getAccountByAccountId,
} = require("../account/index");

const getTransactionsByUserId = async (id) => {
  try {
    const account = await getAccountByUserId(id);
    const transactions = await Transactions.findAll({
      where: {
        [Op.or]: [
          { senderAccount: account.id },
          { recepientAccount: account.id },
        ],
      },
    });

    return transactions;
  } catch (error) {
    return error;
  }
};

const transactionDeposito = async (userId, amount) => {
  try {
    const account = await getAccountByUserId(userId);
    account.balance = parseInt(amount) + parseInt(account.balance);
    const updatedBalance = await account.save();
    const transaction = await Transactions.create({
      senderAccount: null,
      recepientAccount: account.id,
      amount: parseInt(amount),
      type: "deposito",
    });
    return { transaction, updatedBalance };
  } catch (error) {
    throw error;
  }
};

const transactionTransfer = async (userId, recepientId, amount) => {
  try {
    const senderAccount = await getAccountByUserId(userId);
    const recepientAccount = await getAccountByAccountId(recepientId);

    if (senderAccount.balance <= parseInt(amount)) {
      throw new Error('Your balance is not enough!');
    } else {
      senderAccount.balance = senderAccount.balance - parseInt(amount);
      const sendingBalance = await senderAccount.save();

      recepientAccount.balance = recepientAccount.balance + parseInt(amount);
      const acceptBalance = await recepientAccount.save();

      const transaction = await Transactions.create({
        senderAccount: senderAccount.id,
        recepientAccount: recepientAccount.id,
        amount: parseInt(amount),
        type: "transfer",
      });

      return { transaction, sendingBalance, acceptBalance };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getTransactionsByUserId,
  transactionDeposito,
  transactionTransfer,
};

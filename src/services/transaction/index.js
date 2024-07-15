const { Op } = require('sequelize');
const { Transactions } = require("../../models");
const { getAccountByUserId } = require("../account/index");

const getTransactionsByUserId = async (id) => {
  try {
    const account = await getAccountByUserId(id);
    console.log(account.id)
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
        senderAccount:null,
        recepientAccount:account.id,
        amount:parseInt(amount),
        type:"deposito"
    })
    return {transaction,updatedBalance};
  } catch (error) {
    return error;
  }
};

module.exports = { getTransactionsByUserId, transactionDeposito };

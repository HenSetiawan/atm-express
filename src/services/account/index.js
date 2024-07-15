const { Account } = require("../../models");

const createAccount = async (accountData) => {
  try {
    const newAccount = await Account.create(accountData);
    return newAccount.toJSON();
  } catch (error) {
    return error;
  }
};

const getAccountByUserId = async (id) => {
  try {
    const account = await Account.findOne({ where: { userId: id } });
    return account;
  } catch (error) {
    return error;
  }
};

const deleteAccount = async (id) => {
  try {
    const account = await getAccountByUserId(id);
    const accountDeleted = await account.destroy();
    return accountDeleted;
  } catch (error) {
    return error;
  }
};

module.exports = { createAccount, deleteAccount, getAccountByUserId };

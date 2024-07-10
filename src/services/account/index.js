const { Account } = require("../../models");

const createAccount = async (accountData) => {
  try {
    const newAccount = await Account.create(accountData);
    return newAccount.toJSON();
  } catch (error) {
    return error;
  }
};

module.exports = { createAccount };

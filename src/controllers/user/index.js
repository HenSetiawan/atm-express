const { getUserById, createuser } = require("../../services/user");
const { createAccount } = require("../../services/account");
const { hashString } = require("../../utils/hash");
const { generateRandom12DigitNumber } = require("../../utils/randomNumber");
const { validationResult } = require("express-validator");

const getCurrentUser = async (req, res) => {
  const userId = req.data.user.id;
  try {
    const user = await getUserById(userId);
    return res.json({ status: "success", data: user });
  } catch (error) {
    res.status(400).json({ status: "failed", error: error });
  }
};

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const userData = {
    fullName: req.body.fullName,
    nik: req.body.nik,
    address: req.body.address,
    email: req.body.email,
    username: req.body.email,
    password: await hashString(req.body.password),
  };

  let newUser;
  let newAccount;
  try {
    newUser = await createuser(userData);
  } catch (error) {
    res.status(500).json({ message: "something wrong", error: error });
  }

  const accountData = {
    userId: newUser.id,
    balance: 0,
    accountNumber: generateRandom12DigitNumber(),
  };

  try {
    newAccount = await createAccount(accountData);
    res.json({ user: newUser, account: newAccount, message: "success" });
  } catch (error) {
    res.status(500).json({ message: "something wrong", error: error });
  }
};

module.exports = { getCurrentUser, registerUser };

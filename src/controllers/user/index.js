const { getUserById, createuser, deleteUser } = require("../../services/user");
const { createAccount, deleteAccount, getAccountByUserId } = require("../../services/account");
const { hashString } = require("../../utils/hash");
const { generateRandom12DigitNumber } = require("../../utils/randomNumber");
const { validationResult } = require("express-validator");

const getCurrentUser = async (req, res) => {
  const userId = req.data.user.id;
  try {
    const user = await getUserById(userId);
    const account = await getAccountByUserId(userId);
    return res.json({ status: "success", data: user,account:account });
  } catch (error) {
    return res.status(400).json({ status: "failed", error: error });
  }
};

const deleteUserById = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await getUserById(userId);
    if (user == null) {
      return res
        .status(404)
        .json({ status: "failed", message: "user not found" });
    }
  } catch (error) {
    return res.status(500).json({ status: "failed", error: error });
  }
  try {
    await Promise.all([deleteAccount(userId), deleteUser(userId)]);
    return res.json({
      status: "success",
      message: `data user and account with user id ${userId} deleted`,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", error: error });
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
    return res.status(500).json({ message: "something wrong", error: error });
  }

  const accountData = {
    userId: newUser.id,
    balance: 0,
    accountNumber: generateRandom12DigitNumber(),
  };

  try {
    newAccount = await createAccount(accountData);
    return res.json({ user: newUser, account: newAccount, message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "something wrong", error: error });
  }
};

module.exports = { getCurrentUser, registerUser, deleteUserById };

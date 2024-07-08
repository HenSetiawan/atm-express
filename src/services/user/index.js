const { User } = require("../../models");

const getAllUser = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    return error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email: email } });
    return user;
  } catch (error) {
    return error;
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findOne({ where: { id: id } });
    return user;
  } catch (error) {
    return error;
  }
};

module.exports = { getAllUser, getUserByEmail,getUserById };

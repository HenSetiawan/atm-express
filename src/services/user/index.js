const { User } = require("../../models");

const createuser = async (userData) => {
  try {
    const newUser = await User.create(userData);
    return newUser.toJSON();
  } catch (error) {
    return error;
  }
};

const updateUser = async (id, userData) => {
  try {
    const oldUser = await getUserById(id);
    const newUser = await oldUser.update(userData);
    return newUser.toJSON();
  } catch (error) {
    return error;
  }
};

const deleteUser = async (id) => {
  try {
    const user = await getUserById(id);
    const userDeleted = await user.destroy();
    return userDeleted;
  } catch (error) {
    return error;
  }
};

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

module.exports = {
  getAllUser,
  getUserByEmail,
  getUserById,
  createuser,
  updateUser,
  deleteUser
};

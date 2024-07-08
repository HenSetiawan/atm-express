const { getUserById } = require("../../services/user");
const getCurrentUser = async (req, res) => {
  const userId = req.data.user.id;
  try {
    const user = await getUserById(userId);
    return res.json({ status: "success", data: user });
  } catch (error) {
    res.status(400).json({ status: "failed", error: error });
  }
};

module.exports = { getCurrentUser };

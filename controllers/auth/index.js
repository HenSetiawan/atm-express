const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { verifyHashed } = require("../../utils/hash");
const { getUserByEmail } = require("../../services/user");

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await getUserByEmail(email);
    if (user !== null) {
      const isPasswordMatch = await verifyHashed(password, user.password);
      console.log(isPasswordMatch);
      if (isPasswordMatch) {
        const accessToken = jwt.sign({ data: user }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res
          .status(200)
          .json({ status: "success", data: user, token: accessToken });
      } else {
        res
          .status(400)
          .json({ status: "failed", message: "email or password is wrong" });
      }
    } else {
      res.status(404).json({ staus: "failed", message: "user not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong", error: error });
  }
};

module.exports = { login };

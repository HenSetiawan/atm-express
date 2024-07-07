const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { verifyHashed } = require("../../utils/hash");
const { getUserByEmail, getUserById } = require("../../services/user");

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
      if (isPasswordMatch) {
        const accessToken = jwt.sign({ user: user }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        const refreshToken = jwt.sign(
          { user: user },
          process.env.JWT_REFRESH_SECRET,
          {
            expiresIn: "7d",
          }
        );

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
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

const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: "refresh token missing", status: "failed" });
  }

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    async (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "refresh token is not valid", status: "failed" });
      }

      try {
        const userId = decoded.user.id;
        const user = await getUserById(userId);
        const accessToken = jwt.sign({ user: user }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res
          .status(200)
          .json({ status: "success", data: user, token: accessToken });
      } catch (error) {
        return res
          .status(400)
          .json({ message: "user not found", status: "failed" });
      }
    }
  );
};

module.exports = { login, refreshToken };

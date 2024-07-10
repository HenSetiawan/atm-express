const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user");
const { registerValidator } = require("../middlewares/validator/user");
const auth = require("../middlewares/auth");

userRouter.get("/user", auth, userController.getCurrentUser);
userRouter.post(
  "/register",
  auth,
  registerValidator,
  userController.registerUser
);

module.exports = userRouter;

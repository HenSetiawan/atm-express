const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user");
const { registerValidator } = require("../middlewares/validator/user");
const auth = require("../middlewares/auth");

userRouter.get("/user", auth, userController.getCurrentUser);
userRouter.delete("/user/:userId", auth, userController.deleteUserById);
userRouter.post(
  "/register",
  registerValidator,
  userController.registerUser
);

module.exports = userRouter;

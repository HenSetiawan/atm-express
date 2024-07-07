const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user");
const auth = require("../middlewares/auth")

userRouter.get("/user",auth, userController.getCurrentUser);

module.exports = userRouter;

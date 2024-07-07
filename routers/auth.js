const express = require("express");
const authRouter = express.Router();
const loginValidator = require("../middlewares/validator/login");
const authController = require("../controllers/auth");

authRouter.post("/auth/login", loginValidator, authController.login);

module.exports = authRouter;

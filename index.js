const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./src/routers/auth");
const userRouter = require("./src/routers/user");
const transactionRouter = require("./src/routers/transactions");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", transactionRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});

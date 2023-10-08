const express = require("express");
const connection = require("./config/db");
const userRouter = require("./routes/userRouter");

require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to server");
});

app.use("/user", userRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to db");
    console.log(`Listining on port ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});

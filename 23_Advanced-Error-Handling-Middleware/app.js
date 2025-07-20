require("dotenv").config();
const router = require("./routes/user");
const errHandler = require("./middlewares/errorHandler");
const express = require("express");
const mongoose = require('mongoose')
const app = express();

app.use(express.json());

mongoose
  .connect(process.env.DATA_STRING)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

app.use("/", router);
app.use(errHandler);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

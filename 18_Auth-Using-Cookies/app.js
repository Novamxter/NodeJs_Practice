require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const router = require("./router/user");
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(
  session({
    secret: "Mohit@2410",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

// Make flash messages available in all views(ejs files)
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success");
  res.locals.error_msg = req.flash("error");
  next();
});
app.set("view engine", "ejs");

mongoose
  .connect(process.env.DATA_STRING)
  .then(() => {
    console.log("Connected to Database Successfully");
  })
  .catch((err) => {
    console.error("Error : ", err);
  });

app.use(express.static("public"));
app.use("/user", router);

app.listen(3000, () => {
  console.log("Server listening at http://localhost:3000");
});

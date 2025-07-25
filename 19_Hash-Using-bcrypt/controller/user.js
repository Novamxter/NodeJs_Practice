const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getRegister = (req, res) => {
  return res.render("register");
};

exports.postRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      req.flash("error", "Username already exists..");
      res.redirect("/user/register");
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      req.flash("error", "Email already exists..");
      res.redirect("/user/register");
    }

    const hashedPass = await bcrypt.hash(password, 10); //10 is salt rounds
    const newUser = new User({ username, email, password: hashedPass });
    await newUser.save();

    const token = generateToken(newUser);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true for https
      sameSite: "strict",
      maxAge: 360000, // 1 hour
    });

    req.flash("success", "Welcome !");
    return res.redirect("/user/home");
  } catch (err) {
    console.error("Error", err);
    req.flash("error", "Internal Server Error");
    return res.redirect("/user/register");
  }
};

exports.getLogin = (req, res) => {
  return res.render("login");
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      req.flash("error", "Username does not exists..");
      return res.redirect("/user/login");
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      req.flash("error", "Incorrect password.");
      return res.redirect("/user/login");
    }
    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true for https
      sameSite: "strict",
      maxAge: 360000, // 1 hour
    });

    req.flash("success", "Logged in Successfully");
    return res.redirect("/user/home");
  } catch (err) {
    req.flash("error", "Internal Server Error");
    console.error("Error", err);
    return res.redirect("/user/login");
  }
};

exports.getHome = async (req, res) => {
  try {
    const username = req.user.username;
    if (!username) {
      req.flash("error", "Username missing! Login again");
      return res.redirect("/user/login");
    }
    const user = await User.findOne({ username });
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/user/login");
    }
    return res.render("home", { name: user.username, email: user.email });
  } catch (err) {
    console.error("Error", err);
    req.flash("error", "Error in fetching user");
    return res.redirect("/user/login");
  }
};

function generateToken(user) {
  return jwt.sign(
    { _id: user._id, username: user.username },
    process.env.TOKEN_KEY,
    { expiresIn: "1h" }
  );
}

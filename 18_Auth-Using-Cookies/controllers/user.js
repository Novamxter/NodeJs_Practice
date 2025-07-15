const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

exports.getRegister = (req, res) => {
  res.render("register");
};

exports.postRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      req.flash("error", "Username already exists..");
      return res.redirect("/user/login");
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail){
      req.flash("error", "Email already exists..");
      return res.redirect("/user/login");
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = generateToken(newUser);

    //include in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 360000, // 1 hour
    });

    req.flash("success", "Welcome !");
    return res.redirect("/user/home");
  } catch (err) {
    console.error("Server rror:", err);
    return res.status(500).json({ message: "Server error Occured" });
  }
};

exports.getLogin = (req, res) => {
  res.render("login");
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      req.flash("error", "User not found or invalid password.");
      return res.redirect("/user/login");
    }
    const token = generateToken(user);

    //include in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true for https
      sameSite: "strict",
      maxAge: 3600000, //1 hour
    });

    req.flash("success", "Login Successfull");
    return res.redirect("/user/home");
  } catch (err) {
    console.error("Error :", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getHome = async (req, res) => {
  //const token = req.cookies.token
  const username = req.user.username;
  const user = await User.findOne({ username });

  res.render("home", { name: user.username, email: user.email });
};

function generateToken(user) {
  return jwt.sign(
    { _id: user._id, username: user.username },
    process.env.TOKEN_KEY,
    { expiresIn: "1h" }
  );
}

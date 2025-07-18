const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getRegister = (req, res) => {
  return res.render("register");
};

exports.postRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      req.flash("error", "Username Already exists.");
      return res.redirect("/user/register");
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      req.flash("error", "Email Already exists.");
      return res.redirect("/user/register");
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPass });
    await newUser.save();

    const token = generateToken(newUser);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true for https
      sameSite: "strict",
      maxAge: 360000, // 1 hour
    });

    req.flash("success", "Welcome!");
    return res.redirect("/user/home");
  } catch (err) {
    req.flash("error", "Internal server error");
    console.log("Error", err);
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
      req.flash("error", "User does not exists..");
      return res.redirect("/user/login");
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      req.flash("error", "Incorrect Password! try again..");
      return res.redirect("/user/login");
    }

    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true for https
      sameSite: "strict",
      maxAge: 360000, // 1 hour
    });

    req.flash("success", "Logged in Successfully !");
    return res.redirect("/user/home");
  } catch (err) {
    req.flash("error", "Internal server error");
    console.log("Error", err);
    return res.redirect("/user/login");
  }
};

exports.getHome = async (req, res) => {
  const username = req.user.username;
  try {
    if (!username) {
      req.flash("error", "Username missing! Login again");
      return res.redirect("/user/login");
    }
    const user = await User.findOne({ username });
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/user/login");
    }
    //await User.findOneAndUpdate({email:"mehramkmohit968@gmail.com"},{role:'admin'}) --- To make one admin by email
   // const users = await User.find();
    const users = await User.find({ role: { $ne: "admin" } }); // Get non-admins
    return res.render("home", {
      name: user.username,
      email: user.email,
      role: user.role,
      users,
    });
  } catch (err) {
    console.error("Error", err);
    req.flash("error", "Error in fetching user");
    return res.redirect("/user/login");
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete( userId );
    if (!deletedUser) {
      req.flash("error", "User not found.");
      return res.status(404).json({message:"User not Found"});
    }
    req.flash("success", "User deleted by Admin");
    return res.status(200).json({message:"User deleted successfully"});
  } catch (err) {
    req.flash("error", "Internal Server Error.");
    console.log("Error", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

function generateToken(user) {
  return jwt.sign(
    { _id: user._id, username: user.username, role: user.role },
    process.env.TOKEN_KEY,
    { expiresIn: "1h" }
  );
}

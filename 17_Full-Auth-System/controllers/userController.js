const jwt = require("jsonwebtoken");
const path = require("path");
const User = require("../models/userSchema");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check for existing username
    const existingUsername = await User.findOne({ username });
    if (existingUsername)
      return res.status(400).json({ message: "Username already exists" });

    // Check for existing email
    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.status(400).json({ message: "Email already exists" });

    // Save new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Generate JWT token
    const token = generateToken(newUser);

    // Send response
    return res
      .status(200)
      .json({ message: "You Have Successfully Registered", token });
  } catch (err) {
    console.error("Server Error:", err);
    return res.status(500).send("Server Error");
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password)
      return res
        .status(400)
        .json({ message: "User not Found or Invalid Password" });
    const token = generateToken(user);
    return res.status(200).json({ message: "Login Successfully", token });
  } catch (err) {
    console.log("Message:", err);
    return res.status(500).send("Server Error");
  }
};

exports.registerPage = async (req, res) => {
  //res.sendFile('register.html')
  res.sendFile(path.join(__dirname, "..", "public", "register.html"));
};

exports.loginPage = async (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "login.html"));
};

exports.profilePage = async (req, res) => {
  const username = req.user.username
  const user = await User.findOne({ username })
  res.json({user})
};

function generateToken(user) {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.TOKEN_KEY || "testsecret", 
    { expiresIn: "1h" }
  );
}

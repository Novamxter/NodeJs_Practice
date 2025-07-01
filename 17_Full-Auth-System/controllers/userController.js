const jwt = require('jsonwebtoken');
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
    return res.status(200).json({ token });
  } catch (e) {
    console.error("Server Error:", e);
    return res.status(500).send("Server Error");
  }
};

exports.login = async (req,res)=>{
  
}

exports.safeRoute = async (req,res)=>{
  
}

function generateToken(user) {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.TOKEN_KEY || "testsecret", // fallback in dev
    { expiresIn: "1h" }
  );
}
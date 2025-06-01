const User = require("../models/user.js");

exports.getUsers = async (req, res) => {
  const users = await User.find();
  if (!users) res.status(404).json({ error: "users not found" });
  res.status(200).json(users);
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) res.status(404).json({ error: "user not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: "Invalid Id" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: "Invalid Id" });
  }
};

exports.updateUserById = async (req,res)=>{
  try{
    const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    if (!updatedUser) res.status(404).json({ error: "user not found" });
    res.status(200).json(updatedUser);
  }catch(err){
    res.status(400).json({ error: "Invalid Id" });
  }
}

exports.deleteUserById = async (req,res)=>{
  try{
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    if (!deletedUser) res.status(404).json({ error: "user not found" });
    res.status(200).json(deletedUser);
  }catch(err){
    res.status(400).json({ error: "Invalid Id" });
  }
}
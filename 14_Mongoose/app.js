require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const User = require("./Models/schema.js");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected Successfully..");
  })
  .catch(err => {
    console.error("Error:", err);
  });

app.get("/user/:id",async (req,res)=>{
  try{
    const user = await User.findById(req.params.id)
    if(!user) res.status(404).json({error:"User Not Found"})
    res.status(200).json(user)
  }catch(err){
    res.status(400).json({error:err.message})
  }
})

app.post("/user", async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(200).json({
      message: "User Added",
      user: user
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/',async (req,res)=>{
  const users = await User.find()
  res.status(200).json(users)
})

app.listen(3000,()=>{
  console.log("Server Running at http://localhost:3000")
})
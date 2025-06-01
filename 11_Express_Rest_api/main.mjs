//const express = require('express')
import express from "express";
import fs from "fs/promises";
const app = express();

app.use(express.json());

//For in-memory CRUD operations:
// let users = [
//   { id: 1, name: "Mohit", email: "mehramkmohit968@gmail.com" },
//   { id: 2, name: "Sneha", email: "snehamehra132@gmail.com" }
// ];

//Get :
app.get("/", async (req, res) => {
  let users = await fs.readFile("./data/user.json", "utf8");
  users = JSON.parse(users);
  res.status(200).json(users);
});

app.get("/:id", async (req, res) => {
  let users = await fs.readFile("./data/user.json", "utf8");
  users = JSON.parse(users);
  const user = users.find(u => u.id === parseInt(req.params.id));
  user ? res.status(200).json(user) : res.status(404).send("User Not Found");
});

//Post :
app.post("/", async (req, res) => {
  try {
    let users = await fs.readFile("./data/user.json", "utf8");
    users = JSON.parse(users);
    const newUser = {
      id: users.length + 1,
      name: req.body.name,
      email: req.body.email
    };
    users.push(newUser);
    await fs.writeFile("./data/user.json", JSON.stringify(users, null, 2));
    res.status(201).json({
      message: "User Added",
      "Updated data": users
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err });
  }
});

// Put :
app.put("/:id", async (req, res) => {
  try {
    let users = await fs.readFile("./data/user.json", "utf8");
    users = JSON.parse(users);
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) res.status(404).send("User Not Found..");
    user.name = req.body.name;
    await fs.writeFile("./data/user.json", JSON.stringify(users, null, 2));
    res.status(201).json({
      message: "Data updated",
      "Updated data": users
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err });
  }
});

//Delete :
app.delete("/:id", async (req, res) => {
  try {
    let users = await fs.readFile("./data/user.json", "utf8");
    users = JSON.parse(users);
    users = users.filter(u => u.id !== parseInt(req.params.id));
    await fs.writeFile("./data/user.json", JSON.stringify(users, null, 2));
    res.send({
      message: "Data Deleted",
      "Updated Data": users
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err });
  }
});

app.listen(3000, () => {
  console.log("Listening at http://localhost:3000");
});

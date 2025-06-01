//Router
const express = require('express')
const router = express.Router()

router.get('/about',(req,res)=>{
  res.send("About Page");
});

router.get('/contact',(req,res)=>{
  res.send("Contact Page");
});

router.get('/service',(req,res)=>{
  res.send("Service Page")
});

module.exports = router
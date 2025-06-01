const express = require('express')
const app = express()

const types = require('./routes/types')
app.use('/types',types)

app.use((req,res,next)=>{
  const isAuth = true
  if(!isAuth){
    res.send("Not logged in, Try again!")
  }else{
    console.log("First middleware done..")
    next()
  }
})

app.use((req,res,next)=>{
  console.log("Second middleware done..")
  next()
})

app.get('/',(req,res)=>{
  res.send("Home Page")
})

app.listen(3000,()=>{
  console.log("Server Running at http://localhost:3000")
})
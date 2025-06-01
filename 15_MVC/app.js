require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

const userRouter = require('./routes/userRoutes')

mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log("Connected Database Successfully..")
}).catch((err)=>{
  console.log("error",err)
})

app.use('/',userRouter)

app.listen(3000,()=>{
  console.log("Server Running at http://localhost:3000")
})

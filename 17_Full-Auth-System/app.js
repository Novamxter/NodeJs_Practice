require('dotenv').config()
const express = require('express')
//const controller = require('./controllers/userController')
const routes = require('./routes/userRoutes')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect(process.env.DATA_STRING).then(()=>{
  console.log("Connected to database..")
}).catch((e)=>{
  console.error("Unable to connect:",e)
})

app.use('/user',routes)

app.listen(3000,()=>{
  console.log("Running at: http://localhost:3000")
})
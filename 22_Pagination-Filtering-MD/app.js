require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/products')
const insertBulkProducts = require('./insertData')

const app = express()

app.use('/',router)

mongoose.connect(process.env.DATA_STRING).then(()=>{
  console.log("Connected to database..")
  //insertBulkProducts();
}).catch((err)=>{
  console.log("Error: ",err)
})

app.listen(3000,()=>{
  console.log('Server Running at http://localhost:3000')
})
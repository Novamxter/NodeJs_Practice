require('dotenv').config()
const express = require('express')
const routes = require('./routes/userRoutes')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
//app.use(cors())
app.use(cors({
  origin: "http://localhost:5500",
  credentials: true,
  exposedHeaders: ["Authorization"]
}));

//to check for methods and urls
// app.use((req, res, next) => {
//   console.log(`[${req.method}] ${req.url}`);
//   next();
// });

mongoose.connect(process.env.DATA_STRING).then(()=>{
  console.log("Connected to database..")
}).catch((e)=>{
  console.error("Unable to connect:",e)
})

app.use(express.static('public'))
app.use('/user',routes)

app.listen(3000,()=>{
  console.log("Running at: http://localhost:3000")
})
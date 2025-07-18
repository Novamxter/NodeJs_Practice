require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const router = require('./router/user')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())

app.use(session({
  secret: "Mohit#1234",
    resave: false,
    saveUninitialized: true,
}))
app.use(flash())

app.use((req,res,next)=>{
  res.locals.success_msg = req.flash("success")
  res.locals.error_msg = req.flash("error")
  next()
})

app.set('view engine','ejs')

mongoose.connect(process.env.DATA_STRING).then(()=>{
  console.log("Connected to database..")
}).catch((err)=>{
  console.error("Error",err)
})

app.use('/user',router)

app.listen(3000,()=>{
  console.log("Server running at http://localhost:3000")
})
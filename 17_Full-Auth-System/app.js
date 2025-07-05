require('dotenv').config()
const express = require('express')
//const controller = require('./controllers/userController')
const routes = require('./routes/userRoutes')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
//app.use(cors())
app.use(cors({
  origin: "http://localhost:5500", // or '*', but not safe for production
  credentials: true,
  exposedHeaders: ["Authorization"]
}));

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.use(express.static('public'))

//app.set('view engine',"ejs")

mongoose.connect(process.env.DATA_STRING).then(()=>{
  console.log("Connected to database..")
}).catch((e)=>{
  console.error("Unable to connect:",e)
})

app.use('/user',routes)

app.listen(3000,()=>{
  console.log("Running at: http://localhost:3000")
})
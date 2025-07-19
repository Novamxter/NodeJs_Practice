const express = require('express')
const router = require('./routes/userRoutes')
const app = express()

app.use('/uploads',express.static('uploads'))
app.use('/user',router)

app.listen(3000,()=>{
  console.log("Server running at http://localhost:3000")
})
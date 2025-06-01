const express = require('express')
const routes = require('./routes/JwtRoutes')

const app = express()

app.use(express.json())
app.use('/',routes)

app.listen(3000,()=>{
  console.log("Server Listening at http://localhost:3000")
})
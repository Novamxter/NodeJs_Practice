const path = require('path')
const express = require('express')
const app = express()

app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 

app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
  res.render('form')
})

app.post('/submit',(req,res)=>{
  const name = req.body.name
  const email = req.body.email
  res.send(`Your Response have been Received Successfuly.\nName: ${name}\nEmail: ${email}`)
})

app.listen(3000,()=>{
  console.log("Server Running at http://localhost:3000")
})
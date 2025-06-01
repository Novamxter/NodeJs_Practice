const express = require('express')
const app = express()

app.set('view engine','ejs')

let fruits = undefined
fruits = ['Mango','Apple']

app.get('/',(req,res)=>{
  res.render('index',{name:"Mohit",fruits})
})

app.listen(3000,()=>{
  console.log("Server listening at http://localhost:3000")
})
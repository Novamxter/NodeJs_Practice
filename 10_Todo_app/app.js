const express = require('express')
const app = express()

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

let todos = []
app.get('/',(req,res)=>{
  res.render('index',{todos})
})

app.post('/add',(req,res)=>{
  let todo = req.body.todo
  if(todo){
    todos.unshift(todo)
  }
  res.redirect('/')
})

app.listen(3000,()=>{
  console.log("Todo App is running at http://localhost:3000")
})
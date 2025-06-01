const path = require('path')
const express = require('express');
const app = express();

//Router Test :
const userRouter = require('./routes/user')
app.use('/',userRouter);
// Or app.use('/info',userRouter);

const postRouter = require('./routes/post')
app.use('/',postRouter)


//Basic Route :
app.get('/',(req,res)=>{
  res.send("welcome to express.")
})

//Path & Query Params :
app.get('/page/:username',(req,res)=>{
  const username = req.params.username;
  const age = req.query.age
  res.send(`Your name is ${username}..\nYou Are ${age} Years old..`)
});

//Serving Static Files :
//app.use(express.static(path.join(__dirname,'public')))
app.use(express.static('public'))
app.get('/index',(req,res)=>{
  res.sendFile('public/index.html',{root:__dirname})
});

//listening :
app.listen(3000,()=>{
  console.log("Server running at http://localhost:3000")
})
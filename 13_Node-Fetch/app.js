const express = require('express')
const fetch = require('node-fetch')

const app = express()

//GET request with GitHub API:
app.get('/:username',async (req,res)=>{
  const username = req.params.username
  try{
    let response = await fetch(`https://api.github.com/users/${username}`)
    let data = await response.json()
    if(data.message === "Not Found"){
      return res.status(404).json({error:"User not Found"})
    }
    res.status(200).json(data)
  }catch(err){
    res.status(500).json({
      message: "Internal Server Error",
      details: err.message
    })
  }
})

//POST request with JSONPlaceholder:
app.post('/',async (req,res)=>{
  try{
    const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
      method: 'POST',
      headers: {"Content-Type":'application/json'},
      body:JSON.stringify({
        title: "Mohit kumar",
        body: "This is body",
      })
    })
    const data = await response.json()
    res.status(200).json(data)
  }catch(err){
    res.status(500).send("Internal server Error..")
  }
})

app.listen(3000,()=>{
  console.log("Running at http://localhost:3000")
})
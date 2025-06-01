const express = require('express')
const axios = require('axios')

const app = express()

//GET request with GitHub API:
app.get('/:username',async (req,res)=>{
  const name = req.params.username
  try{
    let response = await axios.get(`https://api.github.com/users/${name}`)
    res.status(200).json(response.data)
  }catch(err){
    res.status(500).json({
      message: "Internal Server Error",
      details: err
    })
  }
})

//POST request with JSONPlaceholder:
app.post('/',async (req,res)=>{
  try{
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts',{
      title:"Mohit Kumar",
      body: "This is me ..",
      userId: 1
    })
    res.status(200).send(response.data)
  }catch(err){
    res.status(500).send("Internal server Error..")
  }
})

app.listen(3000,()=>{
  console.log("Running at http://localhost:3000")
})
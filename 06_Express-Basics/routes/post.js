const express = require('express');
const router = express.Router()

router.use(express.urlencoded({extended:true}));
router.use(express.json())

//post with form 
router.post('/postr',(req,res)=>{
  //res.send(req.body)
  const {name,rank} = req.body
  res.send(`Your Name is ${name} having rank - ${rank}`)
})

//post with json
router.post('/postr/json',(req,res)=>{
  const data = req.body;
  res.send({
    message:"Data Received..",
    data
  })
})

module.exports = router;
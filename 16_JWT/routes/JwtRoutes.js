const express = require("express")
const jwt = require("jsonwebtoken")
const router = express.Router()

const users = [
  { id: 1, email: 'john@example.com', password: '123456' },
  { id: 2, email: 'mohit@example.com', password: '654321' }
];

router.post('/login',(req,res)=>{
  const {email, password} = req.body
  const user = users.find(u=>u.email === email && u.password === password)
  if(!user) res.status(404).json({error:'User not Found'})
  const token = jwt.sign({id:user.id,email:user.email},"mohit2410",{expiresIn:'1h'})
  res.json({token})
})

module.exports = router;
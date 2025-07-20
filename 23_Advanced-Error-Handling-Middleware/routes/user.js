const User = require('../models/userSchema')
const AppError = require('../utils/appError')
const express = require('express')
const router = express.Router()

router.get('/user/:id',async (req,res,next)=>{
  const id = req.params.id
  try{
    const user = await User.findById(id)
    if (!user) next(new AppError('User not found',404))
    
    res.status(200).json(user)
  }catch(err){
    next(err)
  }
})

module.exports = router
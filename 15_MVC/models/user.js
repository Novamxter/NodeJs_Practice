const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true
  },
  email:{
    type:String,
    required:true,
    unique: true
  },
  age:{
    type:Number,
    default:18
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
})

const User = mongoose.model('User',userSchema)
module.exports = User
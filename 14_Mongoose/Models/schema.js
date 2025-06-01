const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email:{
    type:String,
    required: true,
    unique:true
  },
  age: {
    type:Number,
    required:true,
    default:18
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('User',userSchema)

module.exports = User
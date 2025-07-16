const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('bcryptusers', userSchema)
module.exports = User

// Mongoose uses an internal library called inflection to:
// - Convert the model name to lowercase
// - Pluralize it

// So:
// "BcryptUser" → "bcryptuser" → "bcryptusers"
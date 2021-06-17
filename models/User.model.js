const mongoose = require('mongoose')
const bscript = require('bcryptjs')
const Schema = mongoose.Schema

const EMAIL_PATTERN = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/i;
const SALT_ROUNDS = 10
const userSchema = new Schema({
  name: {
    type: String,
    required: 'Username is required!',
    minLength: [3, 'name needs at least 3 chars']
  },
  email: {
    type: String,
    required: 'email is required',
    match: [EMAIL_PATTERN, 'email is not valid'], 
    unique: true
  },
  password: {
    type: String, 
    required: 'password needs at least 8 chars'
  }
})

userSchema.pre('save', function (next) {
  
  if (this.isModified('password')) {
    bscript.hash(this.password, SALT_ROUNDS)
      .then(hash => {
        this.password = hash
        next()
      })
      .catch(error => next (error))
  } else {
    next()
  }
})

userSchema.methods.checkPassword = function (passwordToCheck) {
  return bscript.compare(passwordToCheck, this.password)
}


const User = mongoose.model('User', userSchema)

module.exports = User
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const EMAIL_PATTERN = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/i;
const SALT_ROUNDS = 10

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: false,
    required:'Username is requiered',
    minLength: 3
  },
  email:{
    type: String,
    unique: true,
    required: 'A valid email is required',
    match: [EMAIL_PATTERN, 'Please, insert a valid email']
  },
  password: {
    type: String,
    required: 'You have to set a password',
    match: [PASSWORD_PATTERN, 'Your password requires at least 8 characters']

  }
});

userSchema.pre('save', function (next){
  const user = this

  if (user.isModified('password')){
    bcrypt.hash(user.password, SALT_ROUNDS)
    .then(hash => {
      user.password = hash;
      next()
    })
    .catch(error => next(error))
  } else {
    next();
  }
})

userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;

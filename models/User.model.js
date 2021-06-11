const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EMAIL_PATTERN = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/i;

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
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

const User = mongoose.model('User', userSchema);
module.exports = User;

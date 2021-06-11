const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PASSWORD_PATTERN = /^.{8,}$/i;

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: [true, 'Username already registered' ],
    required: 'Username is required', 
    minLength: [3, 'Username needs at least 3 chars']
  },
  password: {
    type: String,
    required: 'Password is required', 
    match: [PASSWORD_PATTERN, 'password needs at least 8 chars']
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

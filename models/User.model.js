const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const PASSWORD_PATTERN = /^.{8,}$/i;
const SALT_ROUNDS = 10;

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: 'Username is required', 
    minLength: [3, 'Username needs at least 3 chars']
  },
  password: {
    type: String,
    required: 'Password is required', 
    match: [PASSWORD_PATTERN, 'password needs at least 8 chars']
  }
});

userSchema.pre('save', function (next) {
  const user = this;                //como recordatorio de que se puede usar el this

  if (user.isModified('password')) {              ///campo password
    bcrypt.hash(user.password, SALT_ROUNDS)       //devuelve promesa
      .then(hash => {
        user.password = hash;   //listo para guardar en la db la password ya hasheada
        next();                 //pasa a la base de datos 
      })
      .catch(error => next(error))
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (passwordToCheck){
  return bcrypt.compare(passwordToCheck, this.password);
}

//va con return para usarla en el conrolador entre en el flujo de la promesa
//es una función que voy a usar en el controlador
//con methods estoy añadiendo este nuevo método a users

const User = mongoose.model('User', userSchema);
module.exports = User;


//validaciones de mongoose, no va al mongo hasta que no compuebe todo eso
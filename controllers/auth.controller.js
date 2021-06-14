const mongoose = require("mongoose");
const User = require("../models/user.model");

module.exports.register = (req, res, next) => {
  res.render('auth/register');
};

module.exports.doRegister = (req, res, next) => {

  function renderWithErrors(errors) {
    res.render('auth/register', {
      user: req.body,
      errors: errors
    });
  }


  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) {
        renderWithErrors({username: 'Username already registered'})
      } else {                                          //si no existe el usuario, tengo que crearlo
        user = {username, password} = req.body;         //va sin const xk ya existe esa constante, entonces se pone así para 'destruirla' como si fuese un let
        return User.create(user)                        //esto devuelve promesa, para que compartan mismo catch, poner el return, mismo camino al error
        .then(user => res.redirect('/'))
      }
    })
    .catch(error => {
      if (errr instanceof mongoose.Error.ValidationError) {
        renderWithErrors(error.errors);
      } else {
        next(error);
      }
    })
};

/*
//le paso los errores al usuario, pinto la vista primera y luego le paso lo que quiero que aparezca
//errors es un objeto, asi que le paso una clave-valor
*/
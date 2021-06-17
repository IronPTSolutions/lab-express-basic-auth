const mongoose = require("mongoose")
const User = require("../models/User.model")


module.exports.register = (req, res, next) => {
  res.render('auth/form')
}

module.exports.doRegister = (req, res, next) => {

  function renderWithErrors (errors) {
    res.render('auth/form', {
      user: req.body,
      errors: errors
    })
  }

  User.findOne({email: req.body.email})
    .then(user => {
      if (user) {
        renderWithErrors({email: 'email already exists!'})
      } else {
        user = {name, email, password} = req.body
        return User.create(user)
          .then(user => res.redirect('/'))
      }
    })
    .catch(error =>{
      if (error instanceof mongoose.Error.ValidationError) {
        renderWithErrors(error.errors)
      } else {
        next (error)
      }
    })
}

module.exports.login = (req, res, next) => {
  res.render('auth/login')
}

module.exports.doLogin = (req, res, next) => {

  function renderLoginWithErrors() {
    res.render('auth/login', {
      user: req.body,
      errors: 'Invalid password or email'
    })
  }
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        renderLoginWithErrors()
      } else {
        return user.checkPassword(req.body.password)
          .then(match => {
            if (!match) {
              renderLoginWithErrors()
            } else {
              req.session.userId = user.id 
              res.redirect('/')
            }
          })
      }
    })
    .catch(next)
}

module.exports.logOut = (req, res, next) => {
  req.session.destroy()
  res.redirect('/')
}
const User = require('../models/user.model');
const mongoose = require('mongoose');

module.exports.register = (req, res, next) => {
    res.render('auth/register', {
        title: 'Register'
    })
}

module.exports.doRegister = (req, res, next) => {
    User
    .findOne({email: req.body.email})
    .then(user => {
        if (user) {
            res.render('auth/register', {
                errors: {
                    user: req.body,
                    email: 'This email have already been registered'
                }
            })           
        } else {
            user = {username, email, password} = req.body
            return User.create(user)
                .then(user => {
                    req.session.userId = user.id;
                    res.redirect('/user-registered')
                })
        }
    })
    .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
            res.render('auth/register' , {
                errors: error.errors
            })
        } else {
            next(error)
        }
    })
 
   
}

module.exports.registered = (req, res, next) => {
    res.render('auth/registered', {
        title: 'You have been successfully registered'
    })
}

module.exports.login = (req, res, next) => {
    res.render('auth/login', {
        title: 'Log in in your account'
    })
}

module.exports.doLogin = (req, res, next) => {

    function renderLoginError(){
        res.render('auth/login', {
            user: req.body,
            errors: {
                email: 'Invalid mail or password',
                password: 'Invalid mail or password'
            }
        })
    }

    User
    .findOne({email: req.body.email})
    .then(user => {
        if (!user) {
           renderLoginError();            
        } else {
            return user.checkPassword(req.body.password)
                .then(match => {
                    if (!match) {
                        renderLoginError(); 
                    } else {
                        req.session.userId = user.id;
                        res.redirect('/welcome')
                    }
                })

        }

    })
    .catch(error => next(error))
    
}

module.exports.logged = (req, res, next) => {
    res.render('auth/welcome', {
        title: 'Welcome again!'
    })
}

module.exports.logout = (req, res, next) => {
    req.session.destroy();
    res.redirect('/login')
}


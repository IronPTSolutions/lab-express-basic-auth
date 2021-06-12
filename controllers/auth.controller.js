const User = require('../models/User.model');
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
        if(user){
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
    res.render('auth/registered',{
        title: 'You have been successfully registered'
    })
}


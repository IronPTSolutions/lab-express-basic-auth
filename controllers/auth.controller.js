const User = require('../models/User.model');
const mongoose = require('mongoose');

module.exports.register = (req, res, next) => {
    res.render('auth/register', {
        title: 'Register'
    })
}

module.exports.doRegister = (req, res, next) => {
    const user = {username, email, password} = req.body;
 /* 
    User
    .find()
    .then(users => {
        users.map(userDb =>{
            userDb.email
            if(userDb.email != req.body.email){
                User
                .create()
                .then(userDb => {  
                    res.render('auth/registered', {
                    user,
                    title: 'You have been successfully registered'
                    })
                  })
                 .catch(error => {
                    if(error instanceof mongoose.Error.ValidationError){
                        res.render('auth/register', {
                         user,
                         errors: error.errors})
                        } else if (error.code === 11000) {
                            res.status(500).render('auth/register', {
                               user,
                               errorMessage: 'This email have already been registered.'
                            })
                    } else{
                        next(error)
                    }
                })
            }
        })
    })
    .catch(next) */

 
    User
    .create(user)
    .then(userDb => {  
       res.render('auth/registered', {
       user,
       title: 'You have been successfully registered'
       })
     })  
         

      
    .catch(error => {
        if(error instanceof mongoose.Error.ValidationError){
            res.render('auth/register', {
             user,
             errors: error.errors})
            } else if (error.code === 11000) {
                res.status(500).render('auth/register', {
                   user,
                   errorMessage: 'This email have already been registered.'
                })
        } else{
            next(error)
        }
    }) 

}

module.exports.registered = (req, res, next) => {
    res.render('auth/registered',{
        title: 'You have been successfully registered'
    })
}


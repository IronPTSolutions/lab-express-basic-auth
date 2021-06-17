const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const User = require('../models/user.model');

const sessionMaxAge = Number(process.env.SESSION_MAX_AGE || 1)

module.exports.sessionConfig = expressSession({
    secret: process.env.SESSION_SECRET || 'super secret (change it)',
    resave: false, //si noy cambios no la reguarda
    saveUninitalized: false, //si no hay login no crea cookie sesión,
    cookie: {
        httpOnly: true, //no se puede leer javascript
        secure: process.env.SESSION_SECURE || false, //bajo https con certificado SSL true
        maxAge: 24 * 3600 * 1000 * sessionMaxAge //tiempo que dura una cookie en milisegundos
    },    
    store: MongoStore.create({
        mongoUrl: mongoose.connection._connectionString, //url Momgo
        ttl: 24 * 3600 * sessionMaxAge //tiempo que dura conexion a BD Mongo en segundos
    })

})

module.exports.loadUser = (req, res, next) => {
    const userId = req.session.userId;
    User
    .findById(userId)
    .then(user => {
      req.user = user ;
      res.locals.currentUser = user;
      next() 
    })
    .catch(error => next(error))

}
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const User = require('../models/user.model');

const sessionMaxAge = Number(process.env.SESSION_MAX_AGE || 7)

module.exports.sessionConfig = expressSession({
    secret: process.env.SESSION_SECRET || 'super secret (change it)',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.SESSION_SECURE || false,
        maxAge: 24 * 3600 * 1000 * sessionMaxAge
    },
    store: MongoStore.create({      //almacenar sesiones, el store pide
        mongoUrl: mongoose.connection._connectionString,    // me traigo mongoose, qe es el que se encarga de hablar con mongo es: toda la url
        ttl: 24 * 3600 * sessionMaxAge              //max tiempo de vida del documento, en segs, le pongo el mismo que el max age
    })
});

module.exports.loadUser = (req, res, next) => {
    const userId = req.session.userId;
    if (!userId) {
        next();
    } else {
        User.findById(userId)
            .then(user => { //preparar al usuario para que sea utilizado en cualquier parte del código
                req.user = user;    //el usuario autentiacado
                res.locals.currentUser = user; //pasar variable global a todos los .hbs
                next(); //ue se pase al siguiente, que siga su flujo
            })
            .catch(error => next(error))
    }
}; //middleware a ejecutar antes de todas las peticiones
const mongoose = require("mongoose");
const User = require("../models/User.model");

module.exports.register = (req, res, next) => {
  res.render("auth/register");
};

module.exports.doRegister = (req, res, next) => {
  const user = ({ username, password } = req.body); ///viene del form, de la petición post
  User.create(user)
    .then((user) => res.redirect("/")) //tendrá que ir a login
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render("auth/register", {
          user: user, //para autocompletar la info que ya había escrito antes
          errors: error.errors,
        });
      } else {
        next(error);
      }
    });
};

/*
if (error.name === 'MongoError' && error.code === 11000){
        res.render("auth/register", {
            user: user, //para autocompletar la info que ya había escrito antes
            errors: MongoError,
          });
      }
      
      */
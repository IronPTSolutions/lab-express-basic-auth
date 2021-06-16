const User = require("../models/user.model")

module.exports.home = (req, res, next) => {
    res.render('private/main', {
        title: 'Welcome to our page!'
    })
}

module.exports.userPage = (req, res, next) => {
if(req.params.id == req.user.id){
    res.render('private/private')
}
}
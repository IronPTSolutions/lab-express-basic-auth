const express = require('express');
const router = express.Router();

const common = require('../controllers/common.controller');
const auth = require('../controllers/auth.controller')


router.get('/', common.home);


router.get('/register', auth.register)
router.post('/register', auth.doRegister)
router.get('/user-registered', auth.registered)
router.get('/login', auth.login)
router.post('/login', auth.doLogin)
router.get('/welcome', auth.logged)
router.get('/logout', auth.logout)

module.exports = router;

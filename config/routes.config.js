const express = require('express');
const router = express.Router();

const common = require('../controllers/common.controller');
const auth = require('../controllers/auth.controller')

router.get('/', common.home);
router.get('/register', auth.register)
router.post('/register', auth.doRegister)

router.get('/login', auth.login)
router.post('/login', auth.doLogin)
router.get('/logout', auth.logOut)
module.exports = router;

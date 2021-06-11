const express = require('express');
const router = express.Router();

const common = require('../controllers/common.controller');
const auth = require('../controllers/auth.controller')


router.get('/', common.home);

router.get('/register', auth.register)
router.post('/register', auth.doRegister)
router.get('/user-registered', auth.registered)

module.exports = router;

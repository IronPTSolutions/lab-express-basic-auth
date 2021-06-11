const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller')
const common = require('../controllers/common.controller');


router.get('/', common.home);

router.get('/register', auth.register);
router.post('/register', auth.doRegister);

module.exports = router;

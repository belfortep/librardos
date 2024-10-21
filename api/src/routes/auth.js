const express = require('express');
const { login, register } = require('../controllers/authController');
const router = express();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
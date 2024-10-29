const express = require('express');
const { login, register, getFavorites, getUserById } = require('../controllers/authController');
const { verifyUser } = require('../util/verifyToken');
const router = express();

router.post('/register', register);
router.post('/login', login);
router.get("/fav/:id", verifyUser, getFavorites)
router.get("/:id", verifyUser, getUserById)

module.exports = router;
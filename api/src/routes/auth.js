const express = require('express');
const { login, register, getFavorites, getUserById, getAllUsers, getUserByName } = require('../controllers/authController');
const { verifyUser } = require('../util/verifyToken');
const router = express();

router.post('/register', register);
router.post('/login', login);
router.get("/fav/:id", verifyUser, getFavorites)
router.get("/:id", verifyUser, getUserById)

router.get('/', verifyUser,getAllUsers);
router.post("/name", verifyUser,getUserByName);

module.exports = router;
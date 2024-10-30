const express = require('express');
const { login, register, getFavorites, getUserById, getAllUsers, getUserByName } = require('../controllers/authController');
// const { login, register, getFavorites, getUserById, getToReadBooks, getReadingBooks, getRead } = require('../controllers/authController');
const { verifyUser } = require('../util/verifyToken');
const router = express();

router.post('/register', register);
router.post('/login', login);
router.get("/fav/:id", verifyUser, getFavorites)
// router.get("/reading/:id", verifyUser, getReadingBooks)
// router.get("/toRead/:id", verifyUser, getToReadBooks)
// router.get("/read/:id", verifyUser, getRead)
//router.get("/status/:id", verifyUser, getToReadBooks)
router.get("/:id", verifyUser, getUserById)

router.get('/', verifyUser,getAllUsers);
router.post("/name", verifyUser,getUserByName);

module.exports = router;
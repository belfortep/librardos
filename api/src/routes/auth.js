const express = require('express');
const { login, register, getFavorites, getUserById, getToReadBooks, getReadingBooks, getRead } = require('../controllers/authController');
const { verifyUser } = require('../util/verifyToken');
const router = express();

router.post('/register', register);
router.post('/login', login);
router.get("/fav/:id", verifyUser, getFavorites)
// router.get("/reading/:id", verifyUser, getReadingBooks)
// router.get("/toRead/:id", verifyUser, getToReadBooks)
// router.get("/read/:id", verifyUser, getRead)
router.get("/status/:id", verifyUser, getToReadBooks)
router.get("/:id", verifyUser, getUserById)

module.exports = router;
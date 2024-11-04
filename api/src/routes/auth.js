const express = require('express');
const { login, register, getFavorites, getUserById, getToReadBooks, getReadingBooks, getRead, getAllUsers, getUserByName, updateAuthInformation, updateUserInformation, addFavoriteGenres, addFavoriteWriters, sendFriendRequest, accepFriendRequest } = require('../controllers/authController');
const { verifyUser } = require('../util/verifyToken');
const router = express();

router.post('/register', register);
router.post('/login', login);
router.get("/fav/:id", verifyUser, getFavorites)
router.get("/reading/:id", verifyUser, getReadingBooks)
router.get("/toRead/:id", verifyUser, getToReadBooks)
router.get("/read/:id", verifyUser, getRead)
router.get("/status/:id", verifyUser, getToReadBooks)
router.get("/:id", verifyUser, getUserById)

router.get('/', verifyUser,getAllUsers);
router.post("/name", verifyUser,getUserByName);

router.put("/auth/:id", verifyUser, updateAuthInformation)
router.put("/user/:id", verifyUser, updateUserInformation)
router.put("/genre/:id", verifyUser, addFavoriteGenres)
router.put("/writer/:id", verifyUser, addFavoriteWriters)
router.put("/sendFriend/:id", verifyUser, sendFriendRequest)
router.put("/acceptFriend/:id", verifyUser, accepFriendRequest)

module.exports = router;
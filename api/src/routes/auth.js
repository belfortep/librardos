const express = require('express');
const { login, register, getFavorites, getUserById, getToReadBooks, getReadingBooks, getRead, getAllUsers, getUserByName, updateAuthInformation, updateUserInformation, updateUserSubscription, addFavoriteGenres, addFavoriteWriters, sendFriendRequest, accepFriendRequest, deleteFriend ,blockUser, getListBooks, accepModeratorRequest, removeUserSubscription, deleteUser, refuseModRequest } = require('../controllers/authController');
const router = express();

router.post('/register', register);
router.post('/login', login);
router.get("/fav/:id", getFavorites)
router.get("/reading/:id", getReadingBooks)
router.get("/toRead/:id", getToReadBooks)
router.get("/read/:id", getRead)
router.get("/status/:id", getToReadBooks)
router.get("/list/:id", getListBooks)
router.get("/:id", getUserById)

router.get('/',getAllUsers);
router.post("/name",getUserByName);

router.put("/auth/:id", updateAuthInformation)
router.put("/user/:id", updateUserInformation)
router.put("/genre/:id", addFavoriteGenres)
router.put("/writer/:id", addFavoriteWriters)
router.put("/sendFriend/:id", sendFriendRequest)
router.put("/acceptFriend/:id", accepFriendRequest)
router.put("/block/:id", blockUser)
router.put("/premium/:id", updateUserSubscription)
router.delete("/premium/:id", removeUserSubscription)
router.delete("/delete/:id", deleteUser)


router.delete("/deleteFriend/:id", deleteFriend)

router.put("/refuseModReq/:id", refuseModRequest)
router.put("/acceptModeratorRequest/:id", accepModeratorRequest)

module.exports = router;
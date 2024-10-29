const Router = require('express')
const router = Router();
const { verifyUser } = require('../util/verifyToken');
const { getAllUsers, getUserByName } = require('../controllers/userController');

router.get('/', verifyUser,getAllUsers);
router.get("/name", verifyUser,getUserByName);
// router.get('/:id', verifyUser,getUser);

module.exports = router
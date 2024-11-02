const Router = require('express')
const router = Router();
const { verifyUser } = require('../util/verifyToken');
const { getAllCommunities, joinCommunity, createCommunity, getCommunity, getCommunityByName, exitCommunity, addMessageToCommunity, deleteCommunity } = require('../controllers/communityController');

router.get('/', verifyUser,getAllCommunities);
router.post("/name", verifyUser,getCommunityByName)
router.get('/:id', verifyUser,getCommunity);
router.post("/", verifyUser, createCommunity);
router.post("/message/:id", verifyUser, addMessageToCommunity)
router.post("/exit/:id", verifyUser, exitCommunity)
router.post('/:id', verifyUser, joinCommunity);
router.delete('/:id', verifyUser, deleteCommunity);

module.exports = router
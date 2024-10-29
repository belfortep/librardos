const Router = require('express')
const router = Router();
const { verifyUser } = require('../util/verifyToken');
const { getAllCommunities, joinCommunity, createCommunity, getCommunity, getCommunityByName, exitCommunity } = require('../controllers/communityController');

router.get('/', getAllCommunities);
router.post("/name", getCommunityByName)
router.get('/:id', getCommunity);
router.post("/", createCommunity);
router.post("/exit/:id", verifyUser, exitCommunity)
router.post('/:id', verifyUser, joinCommunity);

module.exports = router
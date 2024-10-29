const Router = require('express')
const router = Router();
const { verifyUser } = require('../util/verifyToken');
const { getAllCommunities, joinCommunity, createCommunity, getCommunity, getCommunityByName } = require('../controllers/communityController');

router.get('/', getAllCommunities);
router.post("/name", getCommunityByName)
router.get('/:id', getCommunity);
router.post("/", createCommunity);
router.post('/:id', verifyUser, joinCommunity);

module.exports = router
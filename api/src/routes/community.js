const Router = require('express')
const router = Router();
const { verifyUser } = require('../util/verifyToken');
const { getAllCommunities, joinCommunity, createCommunity } = require('../controllers/communityController');

router.get('/', getAllCommunities);
router.post("/", createCommunity);
router.post('/:id', verifyUser, joinCommunity);

module.exports = router
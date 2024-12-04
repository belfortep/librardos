const Router = require('express')
const router = Router();
const { getAllCommunities, joinCommunity, createCommunity, joinCommunityAsMod, renameCommunity, getCommunity, getCommunityByName, getCommunityByBook, exitCommunity, addMessageToCommunity, getCommunityByGender, deleteCommunity, deleteMessageToCommunity, sendModeratorRequest } = require('../controllers/communityController');

router.get('/',  getAllCommunities);
router.post("/name",  getCommunityByName)
router.post("/book",  getCommunityByBook)
router.post("/gender",  getCommunityByGender)
router.get('/:id',  getCommunity);
router.post("/",  createCommunity);
router.post("/message/:id",  addMessageToCommunity)
router.delete("/message/:id",  deleteMessageToCommunity)
router.post("/exit/:id",  exitCommunity)
router.post("/mod/:id",  joinCommunityAsMod);
router.post('/:id',  joinCommunity);
router.patch('/:id',  renameCommunity);
router.delete('/:id',  deleteCommunity);
router.put("/sendModeratorRequest/:id",  sendModeratorRequest);

module.exports = router
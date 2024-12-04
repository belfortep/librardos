const Router = require('express')
const router = Router();
const { getMessageById, updateMessageById } = require('../controllers/messageController');


router.get('/:id', getMessageById);
router.put("/:id", updateMessageById)

module.exports = router
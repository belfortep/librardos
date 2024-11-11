const Router = require('express')
const router = Router();
const { verifyUser } = require('../util/verifyToken');
const { getMessageById } = require('../controllers/messageController');


router.get('/:id', verifyUser, getMessageById);

module.exports = router
const Router = require('express')
const router = Router();
const { getAllBooks, getBookById } = require('../controllers/bookController');
const { verifyUser } = require('../util/verifyToken');



router.get('/', verifyUser, getAllBooks);
router.get('/:id', verifyUser, getBookById);


module.exports = router
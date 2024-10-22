const Router = require('express')
const router = Router();
const { getAllBooks, getBookById, addBookToFavoriteById } = require('../controllers/bookController');
const { verifyUser } = require('../util/verifyToken');



router.get('/', verifyUser, getAllBooks);
router.get('/:id', verifyUser, getBookById);
router.post('/fav/:id', addBookToFavoriteById)


module.exports = router
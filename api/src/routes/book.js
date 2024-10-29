const Router = require('express')
const router = Router();
const { getAllBooks, getBookById, addBookToFavoriteById, addBookToReadList, addBookToToReadList, addBookToReadingList } = require('../controllers/bookController');
const { verifyUser } = require('../util/verifyToken');



router.get('/', verifyUser, getAllBooks);
router.post('/fav/:id', addBookToFavoriteById);
router.post('/toReadBooks/:id', addBookToToReadList);
router.post('/readBooks/:id', addBookToReadList);
router.post('/readingBooks/:id', addBookToReadingList);

router.get('/:id', verifyUser, getBookById);

module.exports = router
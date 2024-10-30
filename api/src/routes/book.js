const Router = require('express')
const router = Router();
const { getAllBooks, getBookById, addBookToFavoriteById, addBookToReadList, addBookToToReadList, addBookToReadingList, scoreBook } = require('../controllers/bookController');
const { verifyUser } = require('../util/verifyToken');



router.get('/', verifyUser, getAllBooks);
router.post('/fav/:id', addBookToFavoriteById);
router.post('/toReadBooks/:id', addBookToToReadList);
router.post('/readBooks/:id', addBookToReadList);
router.post('/readingBooks/:id', addBookToReadingList);
router.post("/scoreBooks/:id", scoreBook)

router.get('/:id', verifyUser, getBookById);

module.exports = router
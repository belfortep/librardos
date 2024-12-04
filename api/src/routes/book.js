const Router = require('express')
const router = Router();
const { getAllBooks, getBookById, addBookToFavoriteById, addBookToReadList, addBookToToReadList, addBookToReadingList, scoreBook, addCommentToBook, addBookToPersonalList, deleteCommentFromBook } = require('../controllers/bookController');



router.get('/',  getAllBooks);
router.post('/fav/:id',  addBookToFavoriteById);
router.post('/toReadBooks/:id', addBookToToReadList);
router.post('/readBooks/:id', addBookToReadList);
router.post('/readingBooks/:id', addBookToReadingList);
router.post('/myBookLists/:id',  addBookToPersonalList);
router.post("/message/:id", addCommentToBook);
router.post("/scoreBooks/:id" , scoreBook);

router.put("/message/:id", deleteCommentFromBook)
router.get('/:id', getBookById);

module.exports = router
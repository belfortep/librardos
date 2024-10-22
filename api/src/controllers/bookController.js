const Book = require('../models/Book');
const User = require('../models/User');

const { HttpCodesEnum } = require('../enum/httpCodes');

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().limit(1000);

        return res.status(HttpCodesEnum.OK).json(books);
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        return res.status(HttpCodesEnum.OK).json(book);
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

const addBookToFavoriteById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(HttpCodesEnum.NOT_FOUND).json({message: "Libro no encontrado"})
        }
        const currentUser = await User.findById(req.body.user_id);
        if (currentUser.books.includes(req.params.id)) {
            return res.status(HttpCodesEnum.FORBBIDEN).json({ message: "Ya tienes este libro en favoritos" });
        }
        await currentUser.updateOne({$push: {books: req.params.id}})
        return res.status(HttpCodesEnum.OK).json("Libro agregado")
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

module.exports = {
    getBookById,
    getAllBooks,
    addBookToFavoriteById
}
const Book = require('../models/Book');
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

module.exports = {
    getBookById,
    getAllBooks,
}
const Book = require('../models/Book');
const { HttpCodesEnum } = require('../enum/httpCodes');

const getAllBooks = async (req, res) => {
    try {
        const solids = await Book.find().limit(1000);

        return res.status(HttpCodesEnum.OK).json(solids);
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}
const getBookById = async (req, res) => {
    try {
        const solid = await Book.findById(req.params.id);

        return res.status(HttpCodesEnum.OK).json(solid);
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

module.exports = {
    getBookById,
    getAllBooks,
}
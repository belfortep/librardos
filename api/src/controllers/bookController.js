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

const addBookToToReadList = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(HttpCodesEnum.NOT_FOUND).json({message: "Libro no encontrado"})
        }
        const currentUser = await User.findById(req.body.user_id);
        if (currentUser.toReadBooks.includes(req.params.id)) {
            return res.status(HttpCodesEnum.FORBBIDEN).json({ message: "Ya tienes este libro en Por Leer" });
        }
        await currentUser.updateOne({$push: {toReadBooks: req.params.id}})
        console.log(`Book with ID ${req.params.id} added to the to-read list of user ${req.body.user_id}`);
        return res.status(HttpCodesEnum.OK).json("Libro agregado a Por Leer")
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

const addBookToReadList = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(HttpCodesEnum.NOT_FOUND).json({message: "Libro no encontrado"})
        }
        const currentUser = await User.findById(req.body.user_id);
        if (currentUser.readBooks.includes(req.params.id)) {
            return res.status(HttpCodesEnum.FORBBIDEN).json({ message: "Ya tienes este libro en Leidos" });
        }
        await currentUser.updateOne({$push: {readBooks: req.params.id}})
        console.log(`Book with ID ${req.params.id} added to the read list of user ${req.body.user_id}`);
        return res.status(HttpCodesEnum.OK).json("Libro agregado a Leidos")
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

const addBookToReadingList = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(HttpCodesEnum.NOT_FOUND).json({message: "Libro no encontrado"})
        }
        const currentUser = await User.findById(req.body.user_id);
        if (currentUser.readingBooks.includes(req.params.id)) {
            return res.status(HttpCodesEnum.FORBBIDEN).json({ message: "Ya tienes este libro en leyendo" });
        }
        await currentUser.updateOne({$push: {readingBooks: req.params.id}})
        console.log(`Book with ID ${req.params.id} added to the reading list of user ${req.body.user_id}`);
        return res.status(HttpCodesEnum.OK).json("Libro agregado a Leyendo")
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

const scoreBook = async (req, res) => {
    try {
        const book = await Book.findOne({_id: req.params.id, "scores.user": req.body.user_id})
        if (book) {
            await Book.updateOne(
                {_id: req.params.id, "scores.user": req.body.user_id},
                {$set: {"scores.$.score": req.body.score}}
            );
            return res.status(HttpCodesEnum.OK).json("Libro actualizado") 
        }
        await Book.updateOne(
            {_id: req.params.id},
            {$push: {scores: {score: req.body.score, user: req.body.user_id}}}
        )

        return res.status(HttpCodesEnum.OK).json("Libro actualizado")
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

module.exports = {
    getBookById,
    getAllBooks,
    addBookToFavoriteById,
    addBookToReadList,
    addBookToReadingList,
    addBookToToReadList,
    scoreBook
}
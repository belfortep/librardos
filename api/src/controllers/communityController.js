const Community = require('../models/Community');
const User = require('../models/User');

const { HttpCodesEnum } = require('../enum/httpCodes');

const getAllCommunities = async (req, res) => {
    try {
        const communities = await Community.find();

        return res.status(HttpCodesEnum.OK).json(communities);
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

const createCommunity = async (req, res) => {
    try {
        const { name, bookId } = req.body
        const community_exists = await Community.findOne({ name: name });
        const book = await book.findById(bookId)
        if (community_exists) return res.status(HttpCodesEnum.BAD_REQUEST).JSON({ message: "Community already exists"})
        const community = new Community({
            name: name,
            bookId: bookId,
            bookName: book.title
        })
        await community.save();
        return res.status(HttpCodesEnum.CREATED).send(community._id);
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

const joinCommunity = async (req, res) => {
    try {
        const community = await Community.findById(req.params.id);
        if (!community) {
            return res.status(HttpCodesEnum.NOT_FOUND).json({message: "Comunidad no encontrada"})
        }
       
        if (community.users.includes(req.body.id)) {
            return res.status(HttpCodesEnum.FORBBIDEN).json({ message: "No podes unirte a una comunidad en la que ya estas" });
        }
        await community.updateOne({$push: {users: req.body.id}})
        return res.status(HttpCodesEnum.OK).json("Unido a comunidad")
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

const exitCommunity = async (req, res) => {
    try {
        const community = await Community.findById(req.params.id);
        if (!community) {
            return res.status(HttpCodesEnum.NOT_FOUND).json({message: "Comunidad no encontrada"})
        }
       
        if (!community.users.includes(req.body.id)) {
            return res.status(HttpCodesEnum.FORBBIDEN).json({ message: "No podes salir de una comunidad que no pertenecias" });
        }
        await community.updateOne({$pull: {users: req.body.id}})
        return res.status(HttpCodesEnum.OK).json("Unido a comunidad")
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

const getCommunity = async (req, res) => {
    try {
        const community = await Community.findById(req.params.id);

        return res.status(HttpCodesEnum.OK).json(community);
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

const getCommunityByName = async (req, res) => {
    console.log(req.body.name)
    try {
        const community = await Community.find({ name: {$regex: req.body.name, $options: "i"}});
        return res.status(HttpCodesEnum.OK).json(community);
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

const getCommunityByBook = async (req, res) => {
    console.log(req.body.bookName)
    try {
        const community = await Community.find({ bookName: {$regex: req.body.bookName, $options: "i"}});
        return res.status(HttpCodesEnum.OK).json(community);
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

const addMessageToCommunity = async (req, res) => {
    try {
        const community = await Community.findById(req.params.id);
        if (!community) {
            return res.status(HttpCodesEnum.NOT_FOUND).json({message: "Comunidad no encontrada"})
        }
        
        await community.updateOne({$push: {messages: req.body.message}})
        return res.status(HttpCodesEnum.OK).json("Mensaje añadido")
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

module.exports = {
    getAllCommunities,
    createCommunity,
    joinCommunity,
    getCommunity,
    getCommunityByName,
    getCommunityByBook,
    exitCommunity,
    addMessageToCommunity
}
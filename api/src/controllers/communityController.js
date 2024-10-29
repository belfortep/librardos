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
        const { name, book } = req.body
        const community_exists = await Community.findOne({ name: name });
        if (community_exists) return res.status(HttpCodesEnum.BAD_REQUEST).JSON({ message: "Community already exists"})
        const community = new Community({
            name: name,
            book: book
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



const getCommunity = async (req, res) => {
    try {
        const community = await Community.findById(req.params.id);

        return res.status(HttpCodesEnum.OK).json(community);
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

module.exports = {
    getAllCommunities,
    createCommunity,
    joinCommunity,
    getCommunity
}
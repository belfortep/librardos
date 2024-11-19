const Community = require('../models/Community');
const Book = require('../models/Book')
const User = require('../models/User');

const { HttpCodesEnum } = require('../enum/httpCodes');
const Message = require('../models/Message');

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
        const { name, bookId, user_id } = req.body

        const user = await User.findById(user_id)
        if (!user.isPremium && user.communities.length >= 3) {
            return res.status(HttpCodesEnum.FORBBIDEN).json({message : "Solo los premium pueden crear o unirse a mas de 3 comunidades"})
        }

        const community_exists = await Community.findOne({ name: name });
        const bookObj = await Book.findById(bookId)
        if (community_exists) return res.status(HttpCodesEnum.BAD_REQUEST).JSON({ message: "Community already exists"})
        const community = new Community({
            name: name,
            bookId: bookId,
            bookName: bookObj._doc.title,
            bookGender: bookObj._doc.gender
        })
        await community.save();
        return res.status(HttpCodesEnum.CREATED).send(community._id);
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

const deleteCommunity = async (req, res) => {
    try {
        const community = await Community.findById(req.params.id);
        if (!community) {
            return res.status(HttpCodesEnum.NOT_FOUND).json({message: "Comunidad no encontrada"})
        }
        await community.deleteOne(); // deleteOne() es un método de mongoose
        return res.status(HttpCodesEnum.OK).json("Comunidad eliminada")
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

const renameCommunity = async (req, res) => {
    try {
        const community = await Community.findById(req.params.id);
        if (!community) {
            return res.status(HttpCodesEnum.NOT_FOUND).json({message: "Comunidad no encontrada"})
        }
        community.name = req.body.name;
        await community.save();
        return res.status(HttpCodesEnum.OK).json("Comunidad eliminada")
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

const joinCommunityAsMod = async (req, res) => {
    try {
        const community = await Community.findById(req.params.id);
        const user = await User.findById(req.body.id)

        if (!community) {
            return res.status(HttpCodesEnum.NOT_FOUND).json({message: "Comunidad no encontrada"})
        }

        if (!community.users.includes(req.body.id)) {
            return res.status(HttpCodesEnum.FORBBIDEN).json({ message: "No podes moderar a una comunidad en la que no estas" });
        }
       
        if (community.moderators.includes(req.body.id)) {
            return res.status(HttpCodesEnum.FORBBIDEN).json({ message: "No podes moderar a una comunidad en la que ya sos" });
        }
        
        await community.updateOne({$push: {moderators: req.body.id}})
        return res.status(HttpCodesEnum.OK).json("Unido a la policia de la comunidad")
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

const joinCommunity = async (req, res) => {
    try {
        const community = await Community.findById(req.params.id);
        const user = await User.findById(req.body.id)

        if (!community) {
            return res.status(HttpCodesEnum.NOT_FOUND).json({message: "Comunidad no encontrada"})
        }
       
        if (community.users.includes(req.body.id)) {
            return res.status(HttpCodesEnum.FORBBIDEN).json({ message: "No podes unirte a una comunidad en la que ya estas" });
        }

        if (!user.isPremium && user.communities.length >= 3) {
            return res.status(HttpCodesEnum.FORBBIDEN).json({message : "Solo los premium pueden unirse a mas de 3 comunidades"})
        }
        
        await community.updateOne({$push: {users: req.body.id}})
        await user.updateOne({$push: {communities: req.params.id}})
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
        
        if (community.moderators.includes(req.body.id)) {
            await community.updateOne({$pull: {moderators: req.body.id}})
        }

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
    try {
        const community = await Community.find({ name: {$regex: req.body.name, $options: "i"}});
        return res.status(HttpCodesEnum.OK).json(community);
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

const getCommunityByBook = async (req, res) => {
    try {
        const community = await Community.find({ bookName: {$regex: req.body.bookName, $options: "i"}});
        return res.status(HttpCodesEnum.OK).json(community);
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

const getCommunityByGender = async (req, res) => {
    try {
        const community = await Community.find({ bookGender: {$regex: req.body.bookGender, $options: "i"}});
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
        
        const new_message = new Message({
            username: req.body.username,
            message: req.body.message,
            father_id: req.body.father_id
        })
        await new_message.save()
        
        await community.updateOne({$push: {messages: new_message._id}})
        return res.status(HttpCodesEnum.OK).json("Mensaje añadido")
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

// const deleteMessageToCommunity = async(req, res) => {
//     console.log("Intentando eliminar un mensaje...");

//     try {
//         const { id } = req.params.id; // ID de la comunidad
//         const { id_msg } = req.body.id_msg; // ID del mensaje

//         if (!id_msg) {
//             return res
//                 .status(HttpCodesEnum.BAD_REQUEST)
//                 .json({ message: "ID del mensaje no proporcionado" });
//         }

//         // Buscar la comunidad
//         const community = await Community.findById(id);
//         if (!community) {
//             return res
//                 .status(HttpCodesEnum.NOT_FOUND)
//                 .json({ message: "Comunidad no encontrada" });
//         }

//         console.log(`Eliminando el mensaje con ID: ${id_msg}`);

//         // Verificar si el mensaje está en la comunidad
//         if (!community.messages.includes(id_msg)) {
//             return res
//                 .status(HttpCodesEnum.BAD_REQUEST)
//                 .json({ message: "El mensaje no pertenece a esta comunidad" });
//         }

//         // Remover el mensaje del array `messages` en la comunidad
//         await community.updateOne({ $pull: { messages: id_msg } });

//         // Buscar y eliminar el mensaje
//         const message = await Message.findById(id_msg);
//         if (!message) {
//             return res
//                 .status(HttpCodesEnum.NOT_FOUND)
//                 .json({ message: "Mensaje no encontrado" });
//         }

//         console.log(`Eliminando mensaje: ${message.message}`);
//         await Message.findByIdAndDelete(id_msg);

//         console.log("Mensaje eliminado exitosamente");
//         return res
//             .status(HttpCodesEnum.OK)
//             .json({ message: "Mensaje eliminado exitosamente" });
//     } catch (err) {
//         console.error("Error al eliminar el mensaje:", err.message);
//         return res
//             .status(HttpCodesEnum.SERVER_INTERNAL_ERROR)
//             .json({ message: err.message });
//     }
// }

module.exports = {
    getAllCommunities,
    createCommunity,
    joinCommunity,
    getCommunity,
    getCommunityByName,
    getCommunityByBook,
    getCommunityByGender,
    exitCommunity,
    addMessageToCommunity,
    deleteCommunity,
    joinCommunityAsMod,
    // deleteMessageToCommunity,
    renameCommunity
}
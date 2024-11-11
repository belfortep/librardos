const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { HttpCodesEnum } = require('../enum/httpCodes');
const Message = require('../models/Message');


const getMessageById = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);

        return res.status(HttpCodesEnum.OK).json(message);
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

module.exports = {
    getMessageById
}

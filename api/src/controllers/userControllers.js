const User = require('../models/User');

const { HttpCodesEnum } = require('../enum/httpCodes');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        return res.status(HttpCodesEnum.OK).json(user);
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

const getUserByName = async (req, res) => {
    console.log(req.body.name)
    try {
        const user = await User.find({ name: {$regex: req.body.name, $options: "i"}});
        return res.status(HttpCodesEnum.OK).json(user);
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}


module.exports = {
    getAllUsers,
    getUserByName,
}
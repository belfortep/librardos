const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { HttpCodesEnum } = require('../enum/httpCodes');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const salt = bcrypt.genSaltSync(10);

        const hash = bcrypt.hashSync(password, salt);

        const user = new User({
            username,
            email,
            password: hash
        })

        await user.save();

        return res.status(HttpCodesEnum.CREATED).send('User created');
    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

const login = async (req, res) => {
    try {


        const user = await User.findOne({ username: req.body.username });

        if (!user) return res.status(HttpCodesEnum.NOT_FOUND).send('User not found');

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return res.status(HttpCodesEnum.NOT_FOUND).send('Incorrect password or user');

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)
        const { password, isAdmin, ...otherDetails } = user._doc;
        return res.cookie("access_token", token, { httpOnly: true }).status(HttpCodesEnum.OK).json({ details: { ...otherDetails }, isAdmin });

    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

module.exports = {
    register,
    login
}
const Psycho = require('../models/Psycho');
const { HttpCodesEnum } = require('../enum/httpCodes');

const getPsychosBetweenDate = async (req, res) => {
    try {

        const psychos = await Psycho.find({ expiredDate: { $gte: req.query.startDate, $lte: req.query.endDate}}).sort({ expiredDate: 1});

        return res.status(HttpCodesEnum.OK).json(psychos);

    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({message: err.message});
    }
}



const getAllPsychos = async (req, res) => {

    if (req.query.startDate != undefined && req.query.endDate != undefined) {
        return getPsychosBetweenDate(req, res);
    }

    try {

        const psychos = await Psycho.find();

        return res.status(HttpCodesEnum.OK).json(psychos);

    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}


const createPsycho = async (req, res) => {
    try {

        const { name, expiredDate } = req.body

        if (!name || !expiredDate) {
            return res.status(HttpCodesEnum.BAD_REQUEST).send("Name and expiredDate are required");
        }

        const psycho = new Psycho(req.body)

        await psycho.save();

        return res.status(HttpCodesEnum.CREATED).json(psycho);

    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}
const getPsychoById = async (req, res) => {
    try {

        const psycho = await Psycho.findById(req.params.id);

        return res.status(HttpCodesEnum.OK).json(psycho);

    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}




const updatePsycho = async (req, res) => {
    try {

        const psycho = await Psycho.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        return res.status(HttpCodesEnum.UPDATED).json(psycho);

    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

const deletePsycho = async (req, res) => {
    try {

        await Psycho.findByIdAndDelete(req.params.id);

        return res.status(HttpCodesEnum.DELETED).send('Psycho deleted');

    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}





module.exports = {
    getAllPsychos,
    getPsychoById,
    createPsycho,
    deletePsycho,
    updatePsycho
}
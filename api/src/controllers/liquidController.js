const Liquid = require('../models/Liquid');
const { HttpCodesEnum } = require('../enum/httpCodes');


const getLiquidsBetweenDate = async (req, res) => {
    try {

        const liquids = await Liquid.find({ expiredDate: { $gte: req.query.startDate, $lte: req.query.endDate}}).sort({ expiredDate: 1});

        return res.status(HttpCodesEnum.OK).json(liquids);

    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({message: err.message});
    }
}

const getAllLiquids = async (req, res) => {

    if (req.query.startDate != undefined && req.query.endDate != undefined) {
        return getLiquidsBetweenDate(req, res);
    }

    try {

        const liquids = await Liquid.find();

        return res.status(HttpCodesEnum.OK).json(liquids);

    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}


const createLiquid = async (req, res) => {
    try {

        const { name, expiredDate } = req.body

        if (!name || !expiredDate) {
            return res.status(HttpCodesEnum.BAD_REQUEST).send("Name and expiredDate are required");
        }

        const liquid = new Liquid(req.body)

        await liquid.save();

        return res.status(HttpCodesEnum.CREATED).json(liquid);

    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}
const getLiquidById = async (req, res) => {
    try {

        const liquid = await Liquid.findById(req.params.id);

        return res.status(HttpCodesEnum.OK).json(liquid);

    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}




const updateLiquid = async (req, res) => {
    try {

        const liquid = await Liquid.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        return res.status(HttpCodesEnum.UPDATED).json(liquid);

    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

const deleteLiquid = async (req, res) => {
    try {

        await Liquid.findByIdAndDelete(req.params.id);

        return res.status(HttpCodesEnum.DELETED).send('Liquid deleted');

    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}





module.exports = {
    getAllLiquids,
    getLiquidById,
    createLiquid,
    deleteLiquid,
    updateLiquid
}
const Solid = require('../models/Solid');
const { HttpCodesEnum } = require('../enum/httpCodes');

const getSolidsBetweenDate = async (req, res) => {
    try {

        const solids = await Solid.find({ expiredDate: { $gte: req.query.startDate, $lte: req.query.endDate}}).sort({ expiredDate: 1});

        return res.status(HttpCodesEnum.OK).json(solids);

    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({message: err.message});
    }
}


const getAllSolids = async (req, res) => {

    if (req.query.startDate != undefined && req.query.endDate != undefined) {
        return getSolidsBetweenDate(req, res);
    }

    try {

        const solids = await Solid.find();

        return res.status(HttpCodesEnum.OK).json(solids);

    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}


const createSolid = async (req, res) => {
    try {

        const { name, expiredDate } = req.body

        if (!name || !expiredDate) {
            return res.status(HttpCodesEnum.BAD_REQUEST).send("Name and expiredDate are required");
        }

        const solid = new Solid(req.body)

        await solid.save();

        return res.status(HttpCodesEnum.CREATED).json(solid);

    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}
const getSolidById = async (req, res) => {
    try {

        const solid = await Solid.findById(req.params.id);

        return res.status(HttpCodesEnum.OK).json(solid);

    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}




const updateSolid = async (req, res) => {
    try {

        const solid = await Solid.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        return res.status(HttpCodesEnum.UPDATED).json(solid);

    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}

const deleteSolid = async (req, res) => {
    try {

        await Solid.findByIdAndDelete(req.params.id);

        return res.status(HttpCodesEnum.DELETED).send('Solid deleted');

    } catch (err) {
        return res.status(HttpCodesEnum.SERVER_INTERNAL_ERROR).json({ message: err.message });
    }
}


 



module.exports = {
    getAllSolids,
    getSolidById,
    createSolid,
    deleteSolid,
    updateSolid
}
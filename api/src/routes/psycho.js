const Router = require('express');
const { getAllPsychos, createPsycho, getPsychoById, deletePsycho, updatePsycho } = require('../controllers/psychoController');
const router = Router();
const { verifyUser } = require('../util/verifyToken');

router.get('/', verifyUser, getAllPsychos);
router.post('/', verifyUser, createPsycho);
router.get('/:id', verifyUser, getPsychoById);
router.delete('/:id', verifyUser, deletePsycho);
router.put('/:id', verifyUser, updatePsycho);

module.exports = router


const Router = require('express')
const router = Router();
const { getAllSolids, createSolid, getSolidById, deleteSolid, updateSolid } = require('../controllers/solidController');
const { verifyUser } = require('../util/verifyToken');



router.get('/', verifyUser, getAllSolids);
router.post('/', verifyUser, createSolid);
router.get('/:id', verifyUser, getSolidById);
router.delete('/:id', verifyUser, deleteSolid);
router.put('/:id', verifyUser, updateSolid);


module.exports = router


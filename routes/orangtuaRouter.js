import { Router } from 'express'


const router = Router();

import {
    getAllOrangtua,
    getOrangtua,
    createOrangtua,
    updateOrangtua,
    deleteOrangtua,
    importDataOrtu,
    exportPdfDataOrtu,
    updateOrangtuaRegister,
    updateOrangtuaKonsumsi,
    // showStats
} from '../controllers/orangtuaController.js';
import upload from '../middleware/multerMiddleware.js';
// import { validateJobInput, validateIdParam } from '../middleware/validationMiddleware.js';
// import { checkForTestUser } from '../middleware/authMiddleware.js';


router.route('/').get(getAllOrangtua).post(createOrangtua);
// router.route('/stats').get(showStats);
router.route('/export').get(exportPdfDataOrtu);
router.route('/import').post(upload.single('file'), importDataOrtu);
router.route('/:id')
    .get(getOrangtua)
    .patch(updateOrangtua)
    .delete(deleteOrangtua);

router.route('/sudah/:id')
    .get(getOrangtua)
    .patch(updateOrangtuaRegister);

router.route('/konsumsi/:id').patch(updateOrangtuaKonsumsi);

export default router;
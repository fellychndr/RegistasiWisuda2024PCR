import { Router } from 'express'


const router = Router();

import {
    getAllOrangtua,
    getOrangtua,
    createOrangtua,
    updateOrangtua,
    // updateOrangtuaRegister,
    deleteOrangtua,
    importDataOrtu,
    // showStats
} from '../controllers/orangtuaController.js';
import upload from '../middleware/multerMiddleware.js';
// import { validateJobInput, validateIdParam } from '../middleware/validationMiddleware.js';
// import { checkForTestUser } from '../middleware/authMiddleware.js';


router.route('/').get(getAllOrangtua);
// router.route('/').get(getAllOrangtua).post(createOrangtua);
// router.route('/stats').get(showStats);
router.route('/import').post(upload.single('file'), importDataOrtu);
router.route('/:id')
    .get(getOrangtua)
    .patch(updateOrangtua)
    .delete(deleteOrangtua);

    // router.route('/sudah/:id')
    // .get(getMahasiswa)
    // .patch(updateMahasiswaRegister);

export default router;
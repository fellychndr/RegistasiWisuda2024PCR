import { Router } from 'express'
const router = Router();

import {
    getAllMahasiswas,
    // getMahasiswa,
    // createMahasiswa,
    // updateMahasiswa,
    // updateMahasiswaRegister,
    // deleteMahasiswa,
    // showStats
} from '../controllers/orangtuaController.js';
// import { validateJobInput, validateIdParam } from '../middleware/validationMiddleware.js';
// import { checkForTestUser } from '../middleware/authMiddleware.js';


router.route('/').get(getAllMahasiswas);
// router.route('/').get(getAllMahasiswas).post(createMahasiswa);
// router.route('/stats').get(showStats);

// router.route('/:id')
    // .get(getMahasiswa)
    // .patch(updateMahasiswa)
    // .delete(deleteMahasiswa);

    // router.route('/sudah/:id')
    // .get(getMahasiswa)
    // .patch(updateMahasiswaRegister);

export default router;
import { Router } from 'express'
const router = Router();

import {
    getAllMahasiswas,
    getMahasiswa,
    createMahasiswa,
    updateMahasiswa,
    updateMahasiswaRegister,
    deleteMahasiswa,
    importDataMhs,
    exportPdfDataMhs,
    showStats
} from '../controllers/mahasiswaController.js';
import upload from '../middleware/multerMiddleware.js';
// import { validateJobInput, validateIdParam } from '../middleware/validationMiddleware.js';
// import { checkForTestUser } from '../middleware/authMiddleware.js';


router.route('/').get(getAllMahasiswas).post(createMahasiswa);
router.route('/stats').get(showStats);
router.route('/export').get(exportPdfDataMhs);
router.route('/import').post(upload.single('file'), importDataMhs);

router.route('/:id')
    .get(getMahasiswa)
    .patch(updateMahasiswa)
    .delete(deleteMahasiswa);

router.route('/sudah/:id')
    .get(getMahasiswa)
    .patch(updateMahasiswaRegister);


export default router;
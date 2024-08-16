import { Router } from 'express'


const router = Router();

import {
    getAllJurusanProdi,
    getJurusanProdi,
    createJurusanProdi,
    updateJurusanProdi,
    deleteJurusanProdi
} from '../controllers/settingsController.js';


router.route('/').get(getAllJurusanProdi).post(createJurusanProdi);
router.route('/:id')
    .get(getJurusanProdi)
    .patch(updateJurusanProdi)
    .delete(deleteJurusanProdi);

export default router;
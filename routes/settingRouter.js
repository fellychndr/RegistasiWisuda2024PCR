import { Router } from 'express'


const router = Router();

import {
    getAllJurusanProdi,
    getJurusanProdi,
    createJurusanProdi,
    updateJurusanProdi,
    deleteJurusanProdi,
    createSettings,
    getAllSettings,
    getSetting,
    updateSetting,
    deleteSetting
} from '../controllers/settingsController.js';

import {
    getAllMeja,
    createMeja,
    getMeja,
    updateMeja,
    deleteMeja
} from '../controllers/MejaRegistrasiController.js';
import { authorizedPermissionsSettings } from '../middleware/authMiddleware.js';


// router.route('/').get(getAllJurusanProdi).post(createJurusanProdi);
// settings
router.route('/')
    .all(authorizedPermissionsSettings('superadmin'))
    .get(getAllSettings)
    .post(createSettings);

router.route('/meja').get(getAllMeja).post(createMeja);

router.route('/:id')
    .all(authorizedPermissionsSettings('superadmin'))
    .get(getSetting)
    .patch(updateSetting)
    .delete(deleteSetting);

// router.route('/:id')
//     .get(getMeja)
//     .patch(updateMeja)
//     .delete(deleteMeja);

router.route('/:id')
    .get(getJurusanProdi)
    .patch(updateJurusanProdi)
    .delete(deleteJurusanProdi);

export default router;
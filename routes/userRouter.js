import { Router } from 'express';
import upload from '../middleware/multerMiddleware.js';

const router = Router();

import {
    getCurrentUser,
    getApplicationStats,
    updateUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
} from '../controllers/userController.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
import { authorizedPermissions, checkForTestUser } from '../middleware/authMiddleware.js';

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', [authorizedPermissions('superadmin'), getApplicationStats]);
router.route('/admin/all-users',)
    .get(authorizedPermissions('superadmin'), getAllUsers)

router.patch('/update-user', checkForTestUser, upload.single('avatar'), validateUpdateUserInput, updateUser);

router.route('/admin/all-users/:id')
    .get(authorizedPermissions('superadmin'), getUserById)
    .patch(authorizedPermissions('superadmin'), updateUserById)
    .delete(authorizedPermissions('superadmin'), deleteUserById);


export default router;
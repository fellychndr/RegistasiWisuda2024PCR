import { Router } from 'express';
import upload from '../middleware/multerMiddleware.js';

const router = Router();

import {
    getCurrentUser,
    getApplicationStats,
    updateUser,
} from '../controllers/userController.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
import { authorizedPermissions, checkForTestUser } from '../middleware/authMiddleware.js';

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', [authorizedPermissions('admin'), getApplicationStats]);
router.patch('/update-user', checkForTestUser, upload.single('avatar'), validateUpdateUserInput, updateUser
);
export default router;
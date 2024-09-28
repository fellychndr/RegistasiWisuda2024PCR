import { Router } from "express";

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
  deleteSetting,
} from "../controllers/settingsController.js";

import {
  getAllMeja,
  createMeja,
  getMeja,
  updateMeja,
  deleteMeja,
} from "../controllers/MejaRegistrasiController.js";
import { authorizedPermissionsSettings } from "../middleware/authMiddleware.js";

// router.route('/').get(getAllJurusanProdi).post(createJurusanProdi);
// settings
router
  .route("/")
  .get(getAllSettings)
  .post(authorizedPermissionsSettings("superadmin"), createSettings);

router
  .route("/meja")
  .get(getAllMeja)
  .post(authorizedPermissionsSettings("superadmin"), createMeja);

router
  .route("/:id")
  // .all(authorizedPermissionsSettings('superadmin'))
  .get(getSetting)
  .patch(authorizedPermissionsSettings("superadmin"), updateSetting)
  .delete(authorizedPermissionsSettings("superadmin"), deleteSetting);

router
  .route("/meja/:id")
  .get(getMeja)
  .patch(authorizedPermissionsSettings("superadmin"), updateMeja)
  .delete(authorizedPermissionsSettings("superadmin"), deleteMeja);

// router.route('/:id')
//     .get(getJurusanProdi)
//     .patch(updateJurusanProdi)
//     .delete(deleteJurusanProdi);

export default router;

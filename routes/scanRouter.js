import { Router } from 'express'
const router = Router();

import {
    updateScan,
    updateKonsumsi
} from '../controllers/scanController.js';
import { checkFeatureEnabled } from '../middleware/featureSettingsMidddleware.js';


router.patch('/:id', checkFeatureEnabled(['Registrasi', 'Konsumsi']), (req, res, next) => {
    
    if (req.enabledFeatures.Registrasi) {
        return updateScan(req, res, next);
    }

    if (req.enabledFeatures.Konsumsi) {
        return updateKonsumsi(req, res, next);
    }

    res.status(400).json({ msg: 'No feature enabled for this request.' });
});

export default router;

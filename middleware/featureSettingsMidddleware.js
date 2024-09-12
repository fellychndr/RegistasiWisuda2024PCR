import SettingsModel from '../models/SettingsModel.js';

export const checkFeatureEnabled = (features) => {
    return async (req, res, next) => {
        try {
            const settings = await SettingsModel.find({ featureName: { $in: features } });
            const enabledFeatures = {};
            
            settings.forEach(setting => {
                enabledFeatures[setting.featureName] = setting.isEnabled;
            });
            
            req.enabledFeatures = enabledFeatures;
            next();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
};

import SettingsModel from '../models/SettingsModel.js';

export const checkFeatureEnabled = (features) => {
    return async (req, res, next) => {
        try {
            
            // console.log("ja;lan");
            const settings = await SettingsModel.find({ featureName: { $in: features } });
            const enabledFeatures = {};

            // console.log(settings);
            
            settings.forEach(setting => {
                enabledFeatures[setting.featureName] = setting.isEnabled;
            });
            
            req.enabledFeatures = enabledFeatures;
            // console.log(req.enabledFeatures);
            next();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
};

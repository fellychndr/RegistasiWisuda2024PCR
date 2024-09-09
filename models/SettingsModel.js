import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema(
    {

        featureName: {
            type: String,
            required: true,
            unique: true
        },
        isEnabled: {
            type: Boolean,
            required: true,
            default: true
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        updatedBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        deletedBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    },
    { timestamps: true },
);

export default mongoose.model('Settings', SettingsSchema);
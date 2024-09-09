import mongoose from 'mongoose';

const MejaRegistrasiSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        tersedia: {
            type: String,
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
        isDeleted: {
            type: Boolean,
            default: false,
        },
        deletedBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        deletedAt: String,
    },
    { timestamps: true },
);

export default mongoose.model('Meja', MejaRegistrasiSchema);
import mongoose from 'mongoose';

const JurusanProdiSchema = new mongoose.Schema(
    {
        jurusan: {
            type: String,
        },
        prodi: {
            type: String,
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

export default mongoose.model('JurusanProdi', JurusanProdiSchema);
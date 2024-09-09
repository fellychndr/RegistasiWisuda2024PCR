import mongoose from 'mongoose';
import { JURUSAN, PRODI } from '../utils/constants.js';

const OrangtuaSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        prodi: {
            type: String,
            // enum: Object.values(PRODI),
            // default: PRODI.D4_TEKNIK_INFORMATIKA,
        },
        noKursi: {
            type: String,
        },
        isRegis: {
            type: Boolean,
            default: false,
        },
        isKonsumsi: {
            type: Boolean,
            default: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        isRegisBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        isKonsumsiBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
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

export default mongoose.model('Orangtua', OrangtuaSchema);
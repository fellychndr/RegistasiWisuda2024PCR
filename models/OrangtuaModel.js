import mongoose from 'mongoose';
import { JURUSAN, PRODI } from '../utils/constants.js';

const MahasiswaSchema = new mongoose.Schema(
    {
        nim: {
            type: String,
            unique: true,
        },
        name: {
            type: String,
        },
        noIjazah: {
            type: String,
            unique: true,
        },
        jurusan: {
            type: String,
            enum: Object.values(JURUSAN),
            default: JURUSAN.JTI,
        },
        prodi: {
            type: String,
            enum: Object.values(PRODI),
            default: PRODI.D4_TEKNIK_INFORMATIKA,
        },
        ipk: {
            type: String,
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
    { timestamps: true }
);

export default mongoose.model('Mahasiswa', MahasiswaSchema);
import Mahasiswa from '../models/MahasiswaModel.js';
import Orangtua from "../models/OrangtuaModel.js";
import { StatusCodes } from "http-status-codes";

export const updateScan = async (req, res) => {
    try {
        let isRegis = true;
        let updatedData;

        const updatedMahasiswa = await Mahasiswa.findByIdAndUpdate(req.params.id, { isRegis: isRegis, isRegisBy: req.user.userId }, {
            new: true,
        });

        if (updatedMahasiswa) {
            updatedData = updatedMahasiswa;
        } else {
            const updatedOrangtua = await Orangtua.findByIdAndUpdate(req.params.id, { isRegis: isRegis, isRegisBy: req.user.userId }, {
                new: true,
            });
            updatedData = updatedOrangtua;
        }

        if (!updatedData) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Data not found' });
        }

        res.status(StatusCodes.OK).json({ msg: 'Registration modified', data: updatedData });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const updateKonsumsi = async (req, res) => {
    try {

        const updatedOrangtua = await Orangtua.findByIdAndUpdate(req.params.id, { isKonsumsi: true, isKonsumsiBy: req.user.userId }, {
            new: true,
        });

        res.status(StatusCodes.OK).json({ msg: 'Registration modified', data: updatedOrangtua });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

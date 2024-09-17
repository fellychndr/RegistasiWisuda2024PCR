import Mahasiswa from '../models/MahasiswaModel.js';
import Orangtua from "../models/OrangtuaModel.js";
import { StatusCodes } from "http-status-codes";
import { triggerPusher } from '../utils/triggerPusher.js';

export const updateScan = async (req, res) => {

    console.log(req.body.mejaId);

    try {
        let isRegis = true;
        let updatedData;
        let message;

        const updatedMahasiswa = await Mahasiswa.findByIdAndUpdate(req.params.id, { isRegis: isRegis, isRegisBy: req.user.userId }, {
            new: true,
        });

        if (updatedMahasiswa) {
            updatedData = updatedMahasiswa;
            message = 'Mahasiswa';
        } else {
            const updatedOrangtua = await Orangtua.findByIdAndUpdate(req.params.id, { isRegis: isRegis, isRegisBy: req.user.userId }, {
                new: true,
            });

            if (updatedOrangtua && updatedOrangtua.isRegis && req.enabledFeatures.Konsumsi) {
                await updateKonsumsi(req, res);
            }

            updatedData = updatedOrangtua;
            message = 'Orangtua';
        }

        if (!updatedData) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Data not found' });
        }

        triggerPusher(req.body.mejaId, message, updatedData);

        res.status(StatusCodes.OK).json({ message: message, data: updatedData });
    } catch (error) {
        console.log(error);

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};


export const updateKonsumsi = async (req, res) => {
    try {

        const updatedOrangtua = await Orangtua.findByIdAndUpdate(req.params.id, { isKonsumsi: true, isKonsumsiBy: req.user.userId }, {
            new: true,
        });

        res.status(StatusCodes.OK).json({ message: 'Registration modified', data: updatedOrangtua });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

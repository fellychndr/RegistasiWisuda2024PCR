import JurusanProdi from "../models/JurusanProdiModel.js";
import SettingsModel from "../models/SettingsModel.js";
import { StatusCodes } from "http-status-codes";

// =============================================================================
// settings
export const getAllSettings = async (req, res) => {

    const { search } = req.query;

    console.log(req.query);

    let queryObject = {
        // isDeleted: false
    };

    if (search) {
        queryObject = {
            $or: [
                { name: { $regex: search, $options: 'i' } },
            ]
        };
    }


    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const settings = await SettingsModel.find(queryObject).skip(skip).limit(limit);

        const settingWithNumber = settings.map((loket, index) => ({
            ...loket.toObject(),
            number: skip + index + 1
        }));

        const totalSettings = await SettingsModel.countDocuments(queryObject);

        const numOfPages = Math.ceil(totalSettings / limit);
        res.status(StatusCodes.OK).json({ total: totalSettings, numOfPages, currentPage: page, data: settingWithNumber });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export const createSettings = async (req, res) => {
    try {
        req.body.createdBy = req.user.userId;
        const settings = await SettingsModel.create(req.body);
        res.status(StatusCodes.CREATED).json({ settings });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export const getSetting = async (req, res) => {
    try {
        const settings = await SettingsModel.findOne({ _id: req.params.id });
        res.status(StatusCodes.OK).json({ settings });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export const updateSetting = async (req, res) => {
    try {
        const settings = await SettingsModel.findByIdAndUpdate(req.params.id, { featureName: req.body.featureName, isEnabled: req.body.isEnabled, updatedBy: req.user.userId }, {
            new: true,
        });
        res.status(StatusCodes.OK).json({ settings });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export const deleteSetting = async (req, res) => {
    try {
        const { id } = req.params
        const settings = await SettingsModel.findByIdAndRemove(id)
        res.status(StatusCodes.OK).json({ msg: 'Setting deleted', settings })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

// =============================================================================

export const getAllJurusanProdi = async (req, res) => {
    try {
        const jurusanProdi = await JurusanProdi.find();
        res.status(StatusCodes.OK).json({ jurusanProdi });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}


export const createJurusanProdi = async (req, res) => {
    try {
        req.body.createdBy = req.user.userId;
        const jurusanProdi = await JurusanProdi.create(req.body);
        res.status(StatusCodes.CREATED).json({ jurusanProdi });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export const getJurusanProdi = async (req, res) => {
    try {
        const jurusanProdi = await JurusanProdi.findOne({ _id: req.params.id });
        res.status(StatusCodes.OK).json({ jurusanProdi });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export const updateJurusanProdi = async (req, res) => {
    const { jurusan, prodi } = req.body
    try {
        const jurusanProdi = await JurusanProdi.findByIdAndUpdate(req.params.id, { jurusan: jurusan, prodi: prodi, updatedBy: req.user.userId }, {
            new: true,
        });
        res.status(StatusCodes.OK).json({ jurusanProdi });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export const deleteJurusanProdi = async (req, res) => {
    try {
        const { id } = req.params
        const jurusanProdi = await JurusanProdi.findByIdAndUpdate(id, { isDeleted: true, deletedBy: req.user.userId }, {
            new: true,
        })
        res.status(StatusCodes.OK).json({ msg: 'Jurusan deleted', jurusanProdi })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export const openTakeKonsumsi = async (req, res) => {
    try {
        const { isOpenKonsumsi } = req.params
        const jurusanProdi = await SettingsModel.findByIdAndUpdate(isOpenKonsumsi, { isOpenKonsumsi: true, updatedBy: req.user.userId }, {
            new: true,
        })
        res.status(StatusCodes.OK).json({ msg: 'Jurusan deleted', jurusanProdi })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}


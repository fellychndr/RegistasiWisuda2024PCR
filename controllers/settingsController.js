import JurusanProdi from "../models/JurusanProdiModel.js";
import { StatusCodes } from "http-status-codes";

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
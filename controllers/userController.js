import { StatusCodes } from 'http-status-codes';
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';
import User from '../models/UserModel.js';

export const getCurrentUser = async (req, res) => {
    console.log(req.userId);

    const user = await User.findOne({ _id: req.user.userId });
    const userWithoutPassword = user.toJSON();
    res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments()

    res.status(StatusCodes.OK).json({ users });
};

export const updateUser = async (req, res) => {
    const newUser = { ...req.body };
    delete newUser.password;

    if (req.file) {
        const response = await cloudinary.v2.uploader.upload(req.file.path);
        await fs.unlink(req.file.path);
        newUser.avatar = response.secure_url;
        newUser.avatarPublicId = response.public_id;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

    if (req.file && updatedUser.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
    }
    res.status(StatusCodes.OK).json({ msg: 'update user' });

};

export const getAllUsers = async (req, res) => {

    try {
        const { search } = req.query
        let queryObject = {}

        if (search) {
            queryObject = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { username: { $regex: search, $options: 'i' } },
                    { role: { $regex: search, $options: 'i' } },
                ]
            }
        }

        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const skip = (page - 1) * limit

        const users = await User.find(queryObject).skip(skip).limit(limit)
        const usersWithNumber = await users.map((user, index) => ({
            ...user.toObject(),
            number: skip + index + 1
        }))
        const totalUsers = await User.countDocuments(queryObject)
        const numOfPages = Math.ceil(totalUsers / limit)
        res.status(StatusCodes.OK).json({ total: totalUsers, numOfPages, currentPage: page, data: usersWithNumber })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(StatusCodes.OK).json({ data: user })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export const updateUserById = async (req, res) => {
    try {
        req.body.updatedBy = req.user.userId;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(StatusCodes.OK).json({ message: 'update user', data: updatedUser });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)
        res.status(StatusCodes.OK).json({ message: 'User deleted', data: user })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}
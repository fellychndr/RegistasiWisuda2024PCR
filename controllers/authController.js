import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import { NotFoundError, UnauthenticatedError } from '../errors/customErrors.js';
import { createJWT } from '../utils/tokenUtils.js';
import crypto from 'crypto';
import { sendResetEmail } from '../utils/sendResetEmail.js';

export const register = async (req, res) => {
    try {
        const isFirtsAccount = await User.countDocuments() === 0
        req.body.role = isFirtsAccount ? 'superadmin' : 'admin';

        if (!req.enabledFeatures.Register && isFirtsAccount === false) throw new UnauthenticatedError('Register is not enabled');

        console.log(req.enabledFeatures);
        console.log(req.enabledFeatures.Register);
        console.log(isFirtsAccount);

        const hashedPassword = await hashPassword(req.body.password);
        req.body.password = hashedPassword;

        const user = await User.create(req.body);
        res.status(StatusCodes.CREATED).json({ msg: "user created" });
    } catch (error) {
        console.log(error);

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        const isValidUser = user && (await comparePassword(
            req.body.password,
            user.password
        ))

        if (!isValidUser) throw new UnauthenticatedError('invalid credentials');

        const token = createJWT({
            userId: user._id,
            role: user.role,
        })

        const oneDay = 1000 * 60 * 60 * 24;

        res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + oneDay),
            secure: process.env.NODE_ENV === 'development',
        });

        res.status(StatusCodes.OK).json({ msg: 'user logged in', token })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie('token', 'logout', {
            httpOnly: true,
            expires: new Date(Date.now()),
        });
        res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const requestResetPassword = async (req, res) => {
    try {
        console.log(req.body);
        // return

        const { email } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            throw new NotFoundError('User not found');
        }

        const token = crypto.randomBytes(20).toString('hex');

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();
        await sendResetEmail(user.email, token);

        res.status(StatusCodes.OK).json({ message: 'Password reset email dikirim! Silakan Cek Email Anda!' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const resetPassword = async (req, res) => {

    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            throw new NotFoundError('Password reset token is invalid or has expired');
        }

        const hashedPassword = await hashPassword(password);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(StatusCodes.CREATED).json({ message: 'Password has been reset' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}



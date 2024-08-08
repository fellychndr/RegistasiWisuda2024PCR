import { StatusCodes } from "http-status-codes";
import Orangtua from '../models/OrangtuaModel.js'
import qrcode from 'qrcode';


export const getAllOrangtua = async (req, res) => {
    const { search, jurusan, prodi, isRegis, isKonsum, sort } = req.query;

    let queryObject = {
        isRegis: false,
        isDeleted: false
    };

    if (search) {
        queryObject = {
            $or: [
                { nim: { $regex: search, $options: 'i' } },
                { name: { $regex: search, $options: 'i' } },
                { noIjazah: { $regex: search, $options: 'i' } },
                { jurusan: { $regex: search, $options: 'i' } },
                { prodi: { $regex: search, $options: 'i' } },
                { noKursi: { $regex: search, $options: 'i' } },
            ]
        }
    }

    if (isRegis && isRegis == "true") {
        queryObject.isRegis = true;
    }
    if (jurusan && jurusan !== 'all') {
        queryObject.jurusan = jurusan;
    }
    if (prodi && prodi !== 'all') {
        queryObject.prodi = prodi;
    }
    const sortOptions = {
        newest: '-createdAt',
        oldest: 'createdAt',
        'a-z': 'name',
        'z-a': '-name',
        'No Kursi - ASC': 'noKursi',
        'No Kursi - DESC': '-noKursi',
        NoKursiASC: 'noKursi',
    };
    const sortKey = sortOptions[sort] || sortOptions.NoKursiASC;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    //option untuk qr code
    const opts = {
        errorCorrectionLevel: "H",
        type: "image/jpeg",
        quality: 0.3,
        margin: 1.2,
        color: {
            dark: "#000",
            light: "#FFFF",
        },
        width: 250,
    };
    
    
    try {
        const orangtuas = await Orangtua.find(queryObject)
        .sort(sortKey)
        .skip(skip)
        .limit(limit);
        
        console.log(orangtuas);
        const orangtuasWithNumber = orangtuas.map((orangtua, index) => ({
            ...orangtua.toObject(),
            number: skip + index + 1
        }));

        const orangtuasWithQRCodes = await Promise.all(orangtuas.map(async (orangtua, index) => {
            const src = await qrcode.toDataURL(orangtua._id.toString(), opts);
            return {
                ...orangtua.toObject(),
                number: skip + index + 1,
                qr_code: src
            };
        }));

        const totalOrangtuas = await Orangtua.countDocuments(queryObject);
        const numOfPages = Math.ceil(totalOrangtuas / limit);

        res.status(StatusCodes.OK).json({ totalOrangtuas, numOfPages, currentPage: page, orangtua: orangtuasWithQRCodes, qrcode: orangtuasWithQRCodes })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export const createOrangtua = async (req, res) => {
    try {
        req.body.createdBy = req.user.userId;
        const orangtua = await Orangtua.create(req.body);
        res.status(StatusCodes.CREATED).json({ orangtua });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export const getOrangtua = async (req, res) => {
    try {
        const { id } = req.params
        const orangtua = await Orangtua.findOne({ _id: id })
        res.status(StatusCodes.OK).json({ orangtua })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export const updateOrangtua = async (req, res) => {
    try {
        req.body.updatedBy = req.user.userId;
        const updatedOrangtua = await Orangtua.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(StatusCodes.OK).json({ msg: 'Orangtua modified', orangtua: updatedOrangtua });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export const deleteOrangtua = async (req, res) => {
    try {
        const { id } = req.params
        const orangtua = await Orangtua.findByIdAndDelete(id)
        res.status(StatusCodes.OK).json({ msg: 'Orangtua deleted', orangtua })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}
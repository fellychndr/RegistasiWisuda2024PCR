import { StatusCodes } from "http-status-codes";
import Orangtua from '../models/OrangtuaModel.js'
import qrcode from 'qrcode';
import OrangtuaModel from "../models/OrangtuaModel.js";
import path from 'path';
import XLSX from 'xlsx';


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

        res.status(StatusCodes.OK).json({ total: totalOrangtuas, numOfPages, currentPage: page, data: orangtuasWithQRCodes, qrcode: orangtuasWithQRCodes })

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


export const importDataOrtu = async (req, res) => {
    try {

        const filePath = path.join(process.cwd(), req.file.path);
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // data.forEach(async (item) => {
        //     const orangtua = new OrangtuaModel({ nim: item.NIM, name: item.Nama, prodi: item.Program_Studi, noKursi: item.No_Kursi }); // Pastikan model Anda cocok
        //     try {
        //         await orangtua.save();
        //         console.log(`Data orangtua ${orangtua.name} berhasil disimpan.`);
        //     } catch (error) {
        //         console.error(`Gagal menyimpan data orangtua: ${error.message}`);
        //     }
        // });

        for (const item of data) {
            const inputSeatNumber = item.No_kursi;
            let formattedSeatNumber;
            if (inputSeatNumber && inputSeatNumber.includes('.')) {
                const [letterPart, numberPart] = inputSeatNumber.split('.');
                const formattedNumberPart = String(numberPart).padStart(3, '0');
                formattedSeatNumber = letterPart + '.' + formattedNumberPart;
            } else {
                console.error('Nomor kursi tidak valid.');
                continue; // Lewati item ini jika nomor kursi tidak valid
            }

            const orangtua = new OrangtuaModel({
                nim: item.NIM,
                name: item.Nama,
                nik: item.NIK,
                noIjazah: item.Nomor_Ijazah,
                prodi: item.Program_Studi,
                jurusan: item.Jurusan,
                ipk: item.IPK,
                noKursi: formattedSeatNumber
            });

            try {
                await orangtua.save();
                console.log(`Data orangtua ${orangtua.name} berhasil disimpan.`);
            } catch (error) {
                console.error(`Gagal menyimpan data orangtua: ${error.message}`);
            }
        }

        res.status(StatusCodes.OK).json({ data: "Berhasil mengimport data" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};
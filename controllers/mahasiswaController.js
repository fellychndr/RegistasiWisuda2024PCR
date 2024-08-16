import { StatusCodes } from 'http-status-codes';
import Mahasiswa from '../models/MahasiswaModel.js';
import qrcode from 'qrcode';
import path from 'path';
import XLSX from 'xlsx';
import PDFDocument from 'pdfkit';

export const getAllMahasiswas = async (req, res) => {
    const { search, jurusan, prodi, isRegis, sort } = req.query;

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
        };
        console.log(queryObject.$or);
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
        const mahasiswas = await Mahasiswa.find(queryObject)
            .sort(sortKey)
            .skip(skip)
            .limit(limit);

        const mahasiswasWithNumber = mahasiswas.map((mahasiswa, index) => ({
            ...mahasiswa.toObject(),
            number: skip + index + 1
        }));

        const mahasiswasWithQRCodes = await Promise.all(mahasiswas.map(async (mahasiswa, index) => {
            const src = await qrcode.toDataURL(mahasiswa._id.toString(), opts); // Menghasilkan kode QR berdasarkan ID mahasiswa
            return {
                ...mahasiswa.toObject(),
                number: skip + index + 1,
                qr_code: src
            };
        }));

        const totalMahasiswas = await Mahasiswa.countDocuments(queryObject);
        const numOfPages = Math.ceil(totalMahasiswas / limit);

        res.status(StatusCodes.OK).json({ total: totalMahasiswas, numOfPages, currentPage: page, data: mahasiswasWithQRCodes, qrcode: mahasiswasWithQRCodes })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const createMahasiswa = async (req, res) => {
    try {
        req.body.createdBy = req.user.userId;
        const mahasiswa = await Mahasiswa.create(req.body);
        res.status(StatusCodes.CREATED).json({ mahasiswa });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const getMahasiswa = async (req, res) => {
    try {
        const mahasiswa = await Mahasiswa.findById(req.params.id);
        res.status(StatusCodes.OK).json({ mahasiswa });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const updateMahasiswa = async (req, res) => {
    try {
        req.body.updatedBy = req.user.userId;
        const updatedMahasiswa = await Mahasiswa.findByIdAndUpdate(req.params.id, req.body, { new: true, });
        res.status(StatusCodes.OK).json({ msg: 'Mahasiswa modified', mahasiswa: updatedMahasiswa });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const updateMahasiswaRegister = async (req, res) => {
    try {
        let isRegis = true;
        const protocolLength = req.headers.referer.startsWith("https://") ? 8 : 7;
        const urlAfterProtocol = req.headers.referer.substring(protocolLength);

        if (urlAfterProtocol.includes("isRegis=true")) {
            isRegis = false;
        }

        const updatedMahasiswa = await Mahasiswa.findByIdAndUpdate(req.params.id, { isRegis: isRegis, isRegisBy: req.user.userId }, {
            new: true,
        });
        res.status(StatusCodes.OK).json({ msg: 'Mahasiswa Registered modified', mahasiswa: updatedMahasiswa });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const deleteMahasiswa = async (req, res) => {
    try {
        const mahasiswa = await Mahasiswa.findByIdAndUpdate(req.params.id, { isDeleted: true, deletedBy: req.user.userId });
        res.status(StatusCodes.OK).json({ msg: 'Mahasiswa deleted', mahasiswa: mahasiswa });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const showStats = async (req, res) => {
    try {

        const totalMahasiswaUnregistered = await Mahasiswa.countDocuments({ isRegis: false, isDeleted: false });
        const totalMahasiswaRegistered = await Mahasiswa.countDocuments({ isRegis: true, isDeleted: false });

        // Menghitung statistik berdasarkan jurusan
        const statsByJurusanUnregistered = await Mahasiswa.aggregate([
            { $match: { isRegis: false, isDeleted: false } },
            { $group: { _id: '$jurusan', count: { $sum: 1 } } },
        ]);
        const statsByJurusanRegistered = await Mahasiswa.aggregate([
            { $match: { isRegis: true, isDeleted: false } },
            { $group: { _id: '$jurusan', count: { $sum: 1 } } },
        ]);

        // Mengubah hasil statistik berdasarkan jurusan menjadi objek dengan jurusan sebagai kunci
        const statsByJurusanUnregisteredObj = statsByJurusanUnregistered.reduce((acc, curr) => {
            const { _id: jurusan, count } = curr;
            acc[jurusan] = count;
            return acc;
        }, {});
        const statsByJurusanRegisteredObj = statsByJurusanRegistered.reduce((acc, curr) => {
            const { _id: jurusan, count } = curr;
            acc[jurusan] = count;
            return acc;
        }, {});

        // Membuat objek defaultStats dengan total seluruh mahasiswa dan statistik berdasarkan jurusan
        const defaultStats = {
            ALLUNREGISTERED: totalMahasiswaUnregistered,
            ALLREGISTERED: totalMahasiswaRegistered,
            UNJTI: statsByJurusanUnregisteredObj.JTI || 0,
            UNJTIN: statsByJurusanUnregisteredObj.JTIN || 0,
            UNAKTP: statsByJurusanUnregisteredObj.AKTP || 0,
            JTI: statsByJurusanRegisteredObj.JTI || 0,
            JTIN: statsByJurusanRegisteredObj.JTIN || 0,
            AKTP: statsByJurusanRegisteredObj.AKTP || 0,
        };

        res.status(StatusCodes.OK).json({ defaultStats });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const getExportMhs = async (req, res) => {
    let queryObject = {
        isRegis: false,
        isDeleted: false
    };
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
        width: 240,
    };

    try {
        const mahasiswas = await Mahasiswa.find(queryObject);
        const mahasiswasWithQRCodes = await Promise.all(mahasiswas.map(async (mahasiswa, index) => {
            const src = await qrcode.toDataURL(mahasiswa._id.toString(), opts);
            return {
                ...mahasiswa.toObject(),
                number: index + 1,
                qr_code: src
            };
        }));

        const totalMahasiswas = await Mahasiswa.countDocuments(queryObject);
        return { total: totalMahasiswas, data: mahasiswasWithQRCodes };
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const exportPdfDataMhs = async (req, res) => {
    try {
        const { data } = await getExportMhs(req, res);

        const doc = new PDFDocument({ size: 'A4', margin: 50 });

        res.setHeader('Content-Disposition', 'attachment; filename=mahasiswas.pdf');
        res.setHeader('Content-Type', 'application/pdf');

        doc.pipe(res);

        doc.fontSize(12).text('Data Mahasiswa', { align: 'center' });

        data.forEach((mahasiswa, i) => {
            // Estimasi tinggi data dan QR code
            const dataHeight = 100;

            // Cek apakah ruang cukup di halaman saat ini
            if (doc.y + dataHeight > doc.page.height - doc.page.margins.bottom) {
                doc.addPage();
            }

            doc.moveDown();
            doc.fontSize(10)
                .text(`No: ${mahasiswa.number}`, 50)
                .text(`NIM: ${mahasiswa.nim}`, 50)
                .text(`Nama: ${mahasiswa.name}`, 50)
                .text(`Jurusan: ${mahasiswa.jurusan}`, 50)
                .text(`Prodi: ${mahasiswa.prodi}`, 50)
                .text(`No Kursi: ${mahasiswa.noKursi}`, 50)
                .text(`No Ijazah: ${mahasiswa.noIjazah}`, 50, doc.y)

            // Menambahkan gambar QR code di sebelah kanan data
            doc.image(mahasiswa.qr_code, doc.page.width - 150, doc.y - 94, {
                fit: [100, 100],
                align: 'right',
                valign: 'center'
            });

            doc.moveDown(1);
        });

        doc.end();
    }  catch (error) {
        res.status(500).json({ message: 'Error generating PDF', error: error.message });
    }
}

export const importDataMhs = async (req, res) => {
    try {

        const filePath = path.join(process.cwd(), req.file.path);
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

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

            const mahasiswa = new mahasiswaModel({
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
                await mahasiswa.save();
                console.log(`Data mahasiswa ${mahasiswa.name} berhasil disimpan.`);
            } catch (error) {
                console.error(`Gagal menyimpan data mahasiswa: ${error.message}`);
            }
        }

        res.status(StatusCodes.OK).json({ data: "Berhasil mengimport data" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};
import 'express-async-errors';
import express from "express";
import morgan from 'morgan';
import * as dotenv from 'dotenv'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import http from 'http'
import https from 'https'
import { Server } from 'socket.io'
import cors from 'cors';
import helmet from 'helmet';
import fs from 'fs';

// routers
import jobRouter from './routes/jobRouter.js'
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import mahasiswaRouter from './routes/mahasiswaRouter.js';
import orangtuaRouter from './routes/orangtuaRouter.js';
import scanRouter from './routes/scanRouter.js';
import settingRouter from './routes/settingRouter.js';

// public 
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

dotenv.config()
const app = express()
app.use(
    cors(),
    helmet()
);

const __dirname = dirname(fileURLToPath(import.meta.url));

const isProduction = process.env.NODE_ENV === 'production';

const server = isProduction ? https.createServer({
    key: fs.readFileSync("/etc/ssl/certs/wisuda2024_certificate.crt"),
    cert: fs.readFileSync("/etc/ssl/private/wisuda2024_private.key"),
    requestCert: true,
    ca: [
        fs.readFileSync("/etc/ssl/certs/wisuda2024_ca.crt")
    ]
}) : http.createServer(app);


// const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [process.env.LINKURL, process.env.LINKURLPROD],
        methods: ["GET", "POST", "PATCH", "DELETE"]
    }
});

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// const __dirname = dirname(fileURLToPath(import.meta.url));
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

app.use(express.static(path.resolve(__dirname, './public')));
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/v1/test', (req, res) => {
    res.json({ msg: "test route" })
})


// app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/mahasiswa', authenticateUser, mahasiswaRouter);
app.use('/api/v1/scan', authenticateUser, scanRouter);
app.use('/api/v1/orangtua', authenticateUser, orangtuaRouter);
app.use('/api/v1/settings', authenticateUser, settingRouter);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public', 'index.html'))
})


app.use('*', (req, res) => {
    res.status(404).json({ msg: 'not found' });
});

app.use(errorHandlerMiddleware);

// io.on('connection', (socket) => {
//     console.log('a user connected', socket.id);
//     socket.on('display', (msg) => {
//         // console.log('asdfasdf', msg);
//         io.emit("display", msg)
//     })
// });

// io.on('connection', (socket) => {
//     console.log('a user connected', socket.id);
//     socket.on('register-table', (mejaId) => {
//         console.log(`Socket ${socket.id} bergabung ke meja: ${mejaId}`);
//         socket.join(mejaId);
//     });
//     console.log(socket.rooms);

//     socket.on('display', (msg) => {
//         console.log(msg);

//         const { mahasiswa, mejaId } = msg;
//         io.to(mejaId).emit("display", { mahasiswa, mejaId });
//     });

//     socket.on('disconnect', () => {
//         console.log(`User disconnected: ${socket.id}`);
//     });
// });



io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('register-table', (mejaId) => {
        console.log(`Socket ${socket.id} bergabung ke meja: ${mejaId}`);
        socket.join(mejaId);
    });


    socket.on('display', (msg) => {
        console.log(msg);

        const { hasil, mejaId } = msg;
        // const { message, data } = hasil;
        // console.log({message, data});


        console.log(`Mengirim data  ke room meja: ${mejaId}`);
        io.to(mejaId).emit('display', hasil);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});




const port = process.env.PORT || 5101;
try {
    await mongoose.connect(process.env.MONGO_URL);
    server.listen(port, () => {
        console.log(`server running on PORT ${port}....`);
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}
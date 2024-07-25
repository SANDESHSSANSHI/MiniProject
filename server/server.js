import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import multer from 'multer';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';

// Create an Express application
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with the server
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // Replace with your client URL if different
    },
});

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/nexus', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Setup multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Handle Socket.IO events
io.on('connection', (socket) => {
    console.log('User connected');

    // File upload notification
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Endpoint to handle file upload
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const { buffer, originalname, mimetype } = req.file;

    const writestream = gfs.createWriteStream({
        filename: originalname,
        content_type: mimetype,
    });

    writestream.on('close', file => {
        io.emit('fileUploaded', { filename: file.filename });
        res.status(200).json({ file });
    });

    writestream.write(buffer);
    writestream.end();
});

// Endpoint to get all files
app.get('/api/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ files });
    });
});

// Start the server
const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

import Grid from 'gridfs-stream';
import mongoose from 'mongoose';
import multer from 'multer';
import pkg from 'mongodb';
const { GridFSBucket } = pkg;

const url = 'http://localhost:8000';

let gfs, gridfsBucket;
const conn = mongoose.connection;

conn.once('open', () => {
    gridfsBucket = new GridFSBucket(conn.db, {
        bucketName: 'photos'
    });
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('photos');
});

// Multer storage setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware for file upload
export const handleUpload = (req, res) => {
    const userSub = req.body.userSub;
    if (!userSub) return res.status(400).json({ msg: "User not authenticated" });

    upload.single('file')(req, res, (err) => {
        if (err) return res.status(500).json({ msg: err.message });

        if (!req.file) return res.status(404).json("File not found");

        const { originalname, buffer } = req.file;
        const filename = `${userSub}_${originalname}`;

        const uploadStream = gridfsBucket.openUploadStream(filename);
        uploadStream.end(buffer);

        uploadStream.on('finish', () => {
            const imageUrl = `${url}/file/${filename}`;
            res.status(200).json({ url: imageUrl });
        });

        uploadStream.on('error', (err) => {
            res.status(500).json({ msg: err.message });
        });
    });
};

// Middleware for retrieving files
export const getFiles = async (req, res) => {
    const userSub = req.params.userSub;
    if (!userSub) return res.status(400).json({ msg: "User not authenticated" });

    try {
        const files = await gfs.files.find({ filename: { $regex: `^${userSub}_` } }).toArray();
        if (!files || files.length === 0) return res.status(404).json({ msg: "No files found" });

        const fileUrls = files.map(file => ({ filename: file.filename, url: `${url}/file/${file.filename}` }));
        res.status(200).json(fileUrls);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

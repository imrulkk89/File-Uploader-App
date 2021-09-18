import multer from 'multer';
import dotEnv from 'dotenv';
dotEnv.config();

const fileStorage = multer.memoryStorage();

const fileUpload = multer({
    storage: fileStorage,
    limits: {
        fileSize: process.env.MAX_FILE_SIZE   
    },
    fileFilter(req, file, cb) {                
        cb(undefined, true)
    }
});

export default fileUpload;
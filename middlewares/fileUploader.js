const multer = require('multer');
const dotEnv = require('dotenv');
dotEnv.config();

const fileStorage = multer.memoryStorage();

exports.fileUpload = multer({
    storage: fileStorage,
    limits: {
        fileSize: process.env.MAX_FILE_SIZE   
    },
    fileFilter(req, file, cb) {                
        cb(undefined, true)
    }
});


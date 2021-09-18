import { fileManager } from '../services/index.esm.js';
import { makeFileNameUnique } from '../utils/index.esm.js';

class FileController{
    
    static upload = async (req, res) => {
        const file = req.file;
        const newFileName = makeFileNameUnique(file.originalname);
        file.newfilename = newFileName;

        const result = fileManager.upload(file);
        if(result)
            res.status(200).json({message: "image uploaded"});
        else
            res.status(500)    
    }

    static read = async (req, res) => {

    }

    static delete = async (req, res) => {

    }
}

export default FileController;
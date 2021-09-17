import { fileManager } from '../services/index.esm.js';

class FileController{
    
    static upload = async (req, res) => {
        fileManager.upload();
        res.status(200).json({message: "image uploaded"});
    }

    static read = async (req, res) => {

    }

    static delete = async (req, res) => {

    }
}

export default FileController;
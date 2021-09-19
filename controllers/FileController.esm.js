import { fileManager, dbService } from '../services/index.esm.js';
import { makeFileNameUnique } from '../utils/index.esm.js';

import fs from 'fs';
const fileHandler = fs.promises;

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
        const { publicKey }= req.params;
        const result = await dbService.find(publicKey); 
        const file = fileManager.read(result.file_name);
              
        res.setHeader('Content-Type', result.mime_type);
        res.setHeader('Content-Disposition', `attachment; filename=${result.file_name}`);

        file.on('close', () => {
            res.end();
        });

        file.on('error', (error)=>{
            console.log(error);
        });
       
        file.pipe(res);        
    }

    static delete = async (req, res) => {

    }
}

export default FileController;
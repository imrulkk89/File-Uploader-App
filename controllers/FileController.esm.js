import { fileManager, dbService, cryptoService } from '../services/index.esm.js';
import { makeFileNameUnique } from '../utils/index.esm.js';

class FileController{
    
    static upload = async (req, res) => {
        const file = req.file;
        const newFileName = makeFileNameUnique(file.originalname);
        file.newfilename = newFileName;

        const result =  fileManager.upload(file);
        if(result){
            const { publicKey, privateKey } = cryptoService.generateKeys();
            const fileInfo = {
                file_name: newFileName,
                mime_type: file.mimetype,
                private_key: privateKey,
                public_key: publicKey
            }

            await dbService.wirte(fileInfo);

            const response = {
                message:"file uploaded",
                privateKey: privateKey,
                publicKey: publicKey
            }

            res.status(200).json(response);
        }
        else
            res.status(501)    
    }

    static read = async (req, res) => {
        const { publicKey }= req.params;
        const result = await dbService.find(publicKey);
        
        if(result){

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

        }else{
            res.status(404).json({message: 'file not found'});
        }
    }

    static delete = async (req, res) => {
        const { privateKey }= req.params;
        const result = await dbService.delete(privateKey);
        if(result){
            fileManager.delete(result.file_name);
            res.status(201).json({message: 'file deleted successfully.'});
        }else{
            res.status(404).json({message: 'file not found'});
        }
    }
}

export default FileController;
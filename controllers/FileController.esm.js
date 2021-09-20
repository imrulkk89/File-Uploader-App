import { fileManager, dbService, cryptoService } from '../services/index.esm.js';
import { makeFileNameUnique } from '../utils/index.esm.js';

class FileController{
    
    static upload = async (req, res) => {

        try {
            const file = req.file;
            const newFileName = makeFileNameUnique(file.originalname);
            file.newfilename = newFileName;

             await fileManager.upload(file);
            
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

           return res.status(200).json(response);
                                       
        } catch (error) {
           return res.status(500).json({message: error.message});
        }            
    }

    static read = async (req, res) => {
        try {
            const { publicKey }= req.params;
            const { data, key } = await dbService.find(publicKey);
            
            if(data && key === 'publicKey'){

                const file = fileManager.read(data.file_name);
                            
                res.setHeader('Content-Type', data.mime_type);
                res.setHeader('Content-Disposition', `attachment; filename=${data.file_name}`);

                file.on('close', () => {
                    res.end();
                });

                file.on('error', (error)=>{
                    console.log(error);
                   return res.status(500).json({message: 'Server Error!'});
                });
            
                file.pipe(res); 
                            
            }else{
               return res.status(404).json({message: 'file not found'});
            }
            
        } catch (error) {
           return res.status(500).json({message: error.message});
        }
        
    }

    static delete = async (req, res) => {
        
        try {
            const { privateKey }= req.params;
            const { data, key } = await dbService.find(privateKey);

            if(data && key === 'privateKey'){
                await fileManager.delete(data.file_name);
                await dbService.delete(privateKey);
                res.status(201).json({message: 'file deleted successfully.'});
            }else{
               throw new Error('Private key not found!'); 
            }

        } catch (error) {
           return res.status(404).json({message: error.message});
        }        
    }
}

export default FileController;
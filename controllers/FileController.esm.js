import moment from 'moment';
import { makeFileNameUnique } from '../utils/index.esm.js';

class FileController{

    constructor(fileManager, dbService, cryptoService){
        this._fileManager = fileManager;
        this._dbService = dbService;
        this._cryptoService = cryptoService;
    }
    
    upload = async (req, res) => {

        try {
            const file = req.file;
            const newFileName = makeFileNameUnique(file.originalname);
            file.newfilename = newFileName;

             await this._fileManager.upload(file);
            
            const { publicKey, privateKey } = this._cryptoService.generateKeys();
            const fileInfo = {
                file_name: newFileName,
                mime_type: file.mimetype,
                private_key: privateKey,
                public_key: publicKey,
                processed_time: moment().format()
            }

            await this._dbService.wirte(fileInfo);

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

    read = async (req, res) => {
        try {
            const { publicKey }= req.params;
            const { data, key } = await this._dbService.find(publicKey);
            
            if(data && key === 'publicKey'){

                const file = this._fileManager.read(data.file_name);
                            
                res.setHeader('Content-Type', data.mime_type);
                res.setHeader('Content-Disposition', `attachment; filename=${data.file_name}`);

                file.on('close', async () => {

                    const fileInfo = {
                        file_name: data.file_name,
                        mime_type: data.mime_type,
                        private_key: data.private_key,
                        public_key: data.public_key,
                        processed_time: moment().format()
                    }

                    await this._dbService.update(data.private_key, fileInfo); 

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

    delete = async (req, res) => {
        
        try {
            const { privateKey }= req.params;
            const { data, key } = await this._dbService.find(privateKey);

            if(data && key === 'privateKey'){
                await this._fileManager.delete(data.file_name);
                await this._dbService.delete(privateKey);
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
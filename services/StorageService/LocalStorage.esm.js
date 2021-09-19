import fs from 'fs';
import dotEnv from 'dotenv';
dotEnv.config();

const fileHandler = fs.promises;
class LocalStorage {
    constructor(){
        this._name = 'local';
        this._bucket = process.env.FOLDER;
    }

    async upload(file){        
        try {                 
            await fileHandler.writeFile(`${this._bucket}/${file.newfilename}`, file.buffer);
            return true;            
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    read(fileName){
        try {                
            return fs.createReadStream(`${this._bucket}/${fileName}`);                                                             
        } catch (error) {
            console.log(error);
        }        
    }

    async delete(fileName){
        try {
            await fileHandler.unlink(`${this._bucket}/${fileName}`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

}

export default LocalStorage;
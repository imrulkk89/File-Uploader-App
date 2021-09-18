import fs from 'fs';
import dotEnv from 'dotenv';
dotEnv.config();

const fileHandler = fs.promises;
class LocalStorage {
    constructor(){
        this._name = 'local';
    }

    async upload(file){        
        try {                 
            await fileHandler.writeFile(`${process.env.FOLDER}/${file.newfilename}`, file.buffer);
            return true;            
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async read(){
        console.log('File read from local storage');
    }

    async delete(){
        console.log('File deleting from local storage');
    }

}

export default LocalStorage;
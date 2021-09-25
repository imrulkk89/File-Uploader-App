const fs = require('fs');
const dotEnv = require('dotenv');
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
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    read(fileName){
        try {                
            return fs.createReadStream(`${this._bucket}/${fileName}`);                                                             
        } catch (error) {
            console.error(error);
            throw error;
        }        
    }

    async delete(fileName){
        try {
            await fileHandler.unlink(`${this._bucket}/${fileName}`);            
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = LocalStorage;
import fs from 'fs';
import dotEnv from 'dotenv';
import exp from 'constants';

dotEnv.config();
const fileHandler = fs.promises;

class DbService{
    constructor(){
        this._db = `${process.env.DB_HOST}/${process.env.DB_NAME}`;
    }

    read = async () => {
        try {
            const data = await fileHandler.readFile(this._db);
            return JSON.parse(data);
        } catch (error) {
            console.error(error);
            return [];
        }         
    }

    wirte = async (info) => {
        const data = await this.read() || [];
        data.push(info);
        await fileHandler.writeFile(this._db, data);
    }

    find = async (publicKey) => {
       const data = await this.read();
       if(data.length){
           return data.find(element => element.public_key === publicKey);             
       } 
    }

    delete  = async () => {

    }
}

export default DbService;
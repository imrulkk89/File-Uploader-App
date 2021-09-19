import fs from 'fs';
import dotEnv from 'dotenv';

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
        try {
            const data = await this.read() || [];
            data.push(info);
            await fileHandler.writeFile(this._db, JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }      
    }

    find = async (publicKey) => {
       const data = await this.read();
       if(data.length){
           return data.find(element => element.public_key === publicKey);             
       }else {
           return false;
       } 
    }

    delete  = async (privateKey) => {
        const data = await this.read();
        if(data.length){
           const selectedData = data.find(element => element.private_key === privateKey);
           if(selectedData){
               const newData = data.filter(element => element.private_key != privateKey);
               await fileHandler.writeFile(this._db, JSON.stringify(newData));
            return selectedData; 
           }else{
               return false;
           }  
        }else{
            return false;
        }
    }
}

export default DbService;
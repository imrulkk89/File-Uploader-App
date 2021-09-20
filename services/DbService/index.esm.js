import fs from 'fs';
import dotEnv from 'dotenv';
import { error } from 'console';

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
            throw error;
        }         
    }

    wirte = async (info) => {
        try {
            const data = await this.read() || [];
            data.push(info);
            await fileHandler.writeFile(this._db, JSON.stringify(data));
        } catch (error) {
            console.error(error);
            throw error;
        }      
    }

    find = async (key) => {
        try {
            const data = await this.read();
            if(data.length){                
                const byPrivateKey = data.find(element => element.private_key === key);  
                const byPublicKey = data.find(element => element.public_key === key);
                
                if(byPrivateKey){
                    return {
                        data: byPrivateKey,
                        key: 'privateKey'
                    }
                }else if(byPublicKey){
                    return {
                        data: byPublicKey,
                        key: 'publicKey'
                    }
                }else{
                    throw new Error('Could not find the element.');
                }

            }else {
                throw new Error('No data in database');
            }
            
        } catch (error) {
            console.error(error);
            throw error;
        }        
    }

    delete  = async (privateKey) => {
        try {
            const data = await this.read();
            if(data.length){                      
                const newData = data.filter(element => element.private_key != privateKey);
                await fileHandler.writeFile(this._db, JSON.stringify(newData));                       
            }else{                
                throw new Error('No data in database'); 
            }            
        } catch (error) {
            console.error(error);
            throw error;
        }         
    }            
}

export default DbService;
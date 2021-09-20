import cron from 'node-cron';
import moment from 'moment';
import { dbService, fileManager } from './services/index.esm.js';

import dotEnv from 'dotenv';
dotEnv.config();


const deleteFiles = async (fileInfo) => {
    try {

        const { private_key } = fileInfo;
        await fileManager.delete(data.file_name);
        await dbService.delete(private_key);            

    } catch (error) {
       console.error(error);
    }
}

const chekInactiveFiles = async() => {
    try {

        const data = await dbService.read();
        const currentTime = moment();

        const inactiveFiles = [];

        data.forEach(element => {        
            const inactiveTime = currentTime.diff(moment(element.processed_time), 'minutes');
            
            if(inactiveTime > process.env.MAX_INACTIVE_TIME){
                inactiveFiles.push(element);
            }
        });

        if(inactiveFiles.length){
            inactiveFiles.forEach(async (item) => {
                await deleteFiles(item);
            });
        }
        
    } catch (error) {
        console.error(error);
    }
}



const cronJob = () => {
    cron.schedule('*/1 * * * *', async () => {
        console.log('Deleting Inactive files...');
        await chekInactiveFiles();
      });
}

export default cronJob;



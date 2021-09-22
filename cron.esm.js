import cron from 'node-cron';
import {  cronService } from './services/index.esm.js';

const cronJob =  () => {
    cron.schedule('*/1 * * * *', async () => {
        console.log('Deleting Inactive files...');

        try {
            const inactiveFiles = await cronService.checkInactiveFiles();
            await cronService.deleteFiles(inactiveFiles);    
        } catch (error) {
            console.error(error);
        }

      });       
}

export default cronJob;



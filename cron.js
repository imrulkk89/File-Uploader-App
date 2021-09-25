const cron = require('node-cron');
const {  cronService } = require('./services/index.js');

exports.cronJob =  () => {
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





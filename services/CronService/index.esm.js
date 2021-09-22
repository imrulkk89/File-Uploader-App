import moment from 'moment';
import dotEnv from 'dotenv';
dotEnv.config();

class CronService{
    constructor(dbService, fileManager){
        this._dbService = dbService;
        this._fileManager = fileManager;
    }

    checkInactiveFiles = async () => {
        try {
            const data = await this._dbService.read();
            const currentTime = moment();
    
            const inactiveFiles = [];
    
            data.forEach(element => {        
                const inactiveTime = currentTime.diff(moment(element.processed_time), 'minutes');
                
                if(inactiveTime >= parseInt(process.env.MAX_INACTIVE_TIME)){
                    inactiveFiles.push(element);
                }
            });
    
            return inactiveFiles;
            
        } catch (error) {
            throw error;
        }
    }

    deleteFiles = async (inactiveFiles) => {
        try {
            
            if(inactiveFiles.length){
                inactiveFiles.forEach( async (file) => {
                    const { file_name, private_key } = file;

                    await this._fileManager.delete(file_name);
                    await this._dbService.delete(private_key); 
                });                    
            }                   

        } catch (error) {
           throw error;
        }
    }
}

export default CronService;
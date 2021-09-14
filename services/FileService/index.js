const FileManager   = require('./FileManager');
const CloudStorage  = require('./CloudStorage');
const LocalStorage  = require('./LocalStorage');

require('dotenv').config();

const storageProvider = () => {
    const fileManager = new FileManager();
    const provider = process.env.PROVIDER;

    switch(provider){
        case 'google':
            fileManager.strategy = new CloudStorage();
            break;    
        case 'local':
            fileManager.strategy = new LocalStorage();
            break;
        default:        
            fileManager.strategy = new LocalStorage();
    }

    return fileManager;
}

module.exports = storageProvider;

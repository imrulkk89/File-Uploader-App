import TYPES from '../ioc/types.esm.js';
import { DIContainer } from '../ioc/index.esm.js';
import GCPStorage from './StorageService/GCPStorage.esm.js';
import LocalStorage from './StorageService/LocalStorage.esm.js';

import dotEnv from 'dotenv';
dotEnv.config();

const storageService = DIContainer.get(TYPES.StorageService);
const fileManager = DIContainer.get(TYPES.FileManager);

storageService.addStrategy(new GCPStorage());
storageService.addStrategy(new LocalStorage());

fileManager.strategy = storageService.getStrategy(process.env.PROVIDER);

export {
    fileManager
}


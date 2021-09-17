import 'reflect-metadata';
import inversify from 'inversify';
import TYPES from './types.esm.js';

import StorageService from '../services/StorageService/index.esm.js';
import FileManager from '../services/StorageService/FileManager.esm.js';

inversify.decorate(inversify.injectable(), StorageService);
inversify.decorate(inversify.injectable(), FileManager);



const DIContainer = new inversify.Container();

DIContainer.bind(TYPES.StorageService).to(StorageService);
DIContainer.bind(TYPES.FileManager).to(FileManager);

export{
    DIContainer
}


import 'reflect-metadata';
import inversify from 'inversify';
import TYPES from './types.esm.js';

import StorageService from '../services/StorageService/index.esm.js';
import DbService from '../services/DbService/index.esm.js';
import CryptoService from '../services/CryptoService/index.esm.js';
import CronService from '../services/CronService/index.esm.js';
import FileManager from '../services/StorageService/FileManager.esm.js';

import FileController from '../controllers/FileController.esm.js';

import GCPStorage from '../services/StorageService/GCPStorage.esm.js';
import LocalStorage from '../services/StorageService/LocalStorage.esm.js';

import dotEnv from 'dotenv';
dotEnv.config();

inversify.decorate(inversify.injectable(), StorageService);
inversify.decorate(inversify.injectable(), DbService);
inversify.decorate(inversify.injectable(), CryptoService);
inversify.decorate(inversify.injectable(), CronService);
inversify.decorate(inversify.injectable(), FileManager);

inversify.decorate(inversify.injectable(), FileController);

const DIContainer = new inversify.Container();

DIContainer.bind(TYPES.StorageService).to(StorageService);
DIContainer.bind(TYPES.DbService).to(DbService);
DIContainer.bind(TYPES.CryptoService).to(CryptoService);
DIContainer.bind(TYPES.CronService).to(CronService);
DIContainer.bind(TYPES.FileManager).to(FileManager);

DIContainer.bind(TYPES.FileController).to(FileController);

const fileManagerInstance     = DIContainer.get(TYPES.FileManager);
const storageService          = DIContainer.get(TYPES.StorageService);

storageService.addStrategy(new GCPStorage());
storageService.addStrategy(new LocalStorage());

fileManagerInstance.strategy = storageService.getStrategy(process.env.PROVIDER);

DIContainer.bind(TYPES.FileManagerInstance).toConstantValue(fileManagerInstance);
DIContainer.bind(TYPES.CryptoLength).toConstantValue(100);

inversify.decorate(inversify.inject(TYPES.DbService), CronService, 0);
inversify.decorate(inversify.inject(TYPES.FileManagerInstance), CronService, 1);

inversify.decorate(inversify.inject(TYPES.CryptoLength), CryptoService, 0);

inversify.decorate(inversify.inject(TYPES.FileManagerInstance), FileController, 0);
inversify.decorate(inversify.inject(TYPES.DbService), FileController, 1);
inversify.decorate(inversify.inject(TYPES.CryptoService), FileController, 2);


export{
    DIContainer
}


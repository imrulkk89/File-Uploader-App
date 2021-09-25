require('reflect-metadata');
const inversify = require('inversify');
const TYPES = require('./types.js');

const dotEnv = require('dotenv');
dotEnv.config();

const StorageService = require('../services/StorageService/index.js');
const DbService = require('../services/DbService/index.js');
const CryptoService = require('../services/CryptoService/index.js');
const CronService = require('../services/CronService/index.js');
const FileManager = require('../services/StorageService/FileManager.js');

const FileController = require('../controllers/FileController.js');

const GCPStorage = require('../services/StorageService/GCPStorage.js');
const LocalStorage = require('../services/StorageService/LocalStorage.js');

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


exports.DIContainer = DIContainer;


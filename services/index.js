const TYPES = require('../ioc/types.js');
const { DIContainer } = require('../ioc/index.js');

exports.cronService    = DIContainer.get(TYPES.CronService);
exports.fileController = DIContainer.get(TYPES.FileController);
exports.dbService      = DIContainer.get(TYPES.DbService);



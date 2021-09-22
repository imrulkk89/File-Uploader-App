import TYPES from '../ioc/types.esm.js';
import { DIContainer } from '../ioc/index.esm.js';

const cronService    = DIContainer.get(TYPES.CronService);
const fileController = DIContainer.get(TYPES.FileController);

export {
    cronService,
    fileController
}


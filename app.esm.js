import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import fileRouter from './routes/file.esm.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', fileRouter);

export default app;
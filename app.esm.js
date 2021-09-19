import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import rateLimit from 'express-rate-limit';
import dotEnv from 'dotenv';

import fileRouter from './routes/file.esm.js';

dotEnv.config();

const app = express();
const limiter = rateLimit({
    windowMs: process.env.API_RATE_LIMIT_MS,
    max: process.env.API_RATE_LIMIT_HIT
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(limiter);

app.use('/', fileRouter);

export default app;
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const rateLimit = require('express-rate-limit');

const dotEnv = require('dotenv');
dotEnv.config();

const fileRouter = require('./routes/file.js');

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

module.exports = app;
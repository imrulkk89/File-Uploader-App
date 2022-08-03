const app = require('./app.js');
const { cronJob } = require('./cron.js');

const dotenv = require('dotenv');
dotenv.config();

cronJob();

const HOST = (process.env.HOST) || 'localhost';
const PORT = (process.env.PORT) || 3000;

app.listen(PORT, () => {
    console.log(`Server Running at: http://${HOST}:${PORT}`);
});
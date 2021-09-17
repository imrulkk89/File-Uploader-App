import app from './app.esm.js';
import dotenv from 'dotenv';

dotenv.config();

const HOST = (process.env.HOST) || 'localhost';
const PORT = (process.env.PORT) || 3000;

app.listen(PORT, () => {
    console.log(`Server Running at: http://${HOST}:${PORT}`);
});
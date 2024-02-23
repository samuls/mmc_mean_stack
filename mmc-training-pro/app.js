import express from 'express';
import router from './routers/index.js';
import server from './server.js';
import { config } from 'dotenv';
import connectDB from './config/db.config.js';

const PORT  = 3000;
const app = server;

config();

connectDB();

app.use(express.json());

router(app);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


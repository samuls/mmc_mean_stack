import express from "express";
import { config } from "dotenv";
import server from "./server.js";
import connectDb from "./config/db.config.js";
import router from "./routers/index.js";
import cors from "cors";
const PORT = 3000;
const app = server;
app.use(cors());
config();

connectDb();

app.use(express.json());

router(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

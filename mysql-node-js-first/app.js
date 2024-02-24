import express from "express";
import server from "./server.js";
import { config } from "dotenv";
import router from "./routers/index.js";

const PORT = 3000;
const app = server;

config();

app.use(express.json());

router(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from "express";
import server from "./server.js";
import { config } from "dotenv";
import router from "./routers/index.js";
import cors from "cors";

const PORT = 3000;
const app = server;
app.use(cors());
config();

app.use(express.json());

router(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

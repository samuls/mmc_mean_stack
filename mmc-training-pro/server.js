import express from "express";
import connectDB from "./config/db.config.js";

const app = express();
connectDB;
export default app;

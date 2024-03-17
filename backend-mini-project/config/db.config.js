import mongoose from "mongoose";

const db = "mongodb://localhost:27017/online-shopping";

const connectDb = () => {
  try {
    const conn = mongoose.connect(db);
    console.log("Database connection established ....");
  } catch (e) {}
};

export default connectDb;

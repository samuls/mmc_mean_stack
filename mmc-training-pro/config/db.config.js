import mongoose from "mongoose";

const db = process.env.MONGODB_URI || "mongodb://localhost:27017/mmc-dev";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(db, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

export default connectDB;

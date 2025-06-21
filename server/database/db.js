import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DBConnection = async () => {
  const MONGO_URI = process.env.MONGODB_URI; // Ensure this matches your .env

  if (!MONGO_URI) {
    console.error("MONGODB_URI environment variable is not defined");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI, {
      // recommended options
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error while connecting with the database:", error.message);
    process.exit(1);
  }
};

export default DBConnection;

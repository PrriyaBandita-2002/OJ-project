const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const DBconnection = async () => {
  const MONGO_URI = process.env.MONGO_URL;
  if (!MONGO_URI) {
    console.error("ERROR hai bhai check: MONGO_URL is not set");
    process.exit(1);
  }
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected succesfully");
  } catch (error) {
    console.error("Error while connecting to the database:", error.message);
    process.exit(1);
  }
};
module.export = { DBconnection };

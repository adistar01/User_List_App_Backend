const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("Server connected to Database");
  } catch (error) {
    console.log(`Unable to connect to MongoDB server`);
    process.exit(1);
  }
};

module.exports = connectDb;

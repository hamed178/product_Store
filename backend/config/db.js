const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MOGO_URI);
    console.log(`mongooDb Connected :${connection.connection.host}`);
  } catch (err) {
    console.log(`ERROR :${err.message}`);
    process.exit(1);
  }
};
module.exports = connectDB;

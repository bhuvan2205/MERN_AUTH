const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose?.connect(process.env.MONGO_URL);
    if (connection) {
      console.log(
        "🚀 Database connection established, " +
          "URL: " +
          connection?.connection?.host
      );
    }
  } catch (error) {
    console.log("👾 Not able to connect DB");
    process.exit(1);
  }
};

module.exports = { connectDB };

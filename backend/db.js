const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://0.0.0.0:27017/');
    console.log(`Connected to mongodb database ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error while connecting to mongodb ${error}`);
  }
};

module.exports = connectDB;

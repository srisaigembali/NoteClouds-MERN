const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ckag8uq.mongodb.net/notes`
    );
    console.log(`Connected to mongodb database ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error while connecting to mongodb ${error}`);
  }
};

module.exports = connectDB;

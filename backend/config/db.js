// backend/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://yash:yash0000@ioversized-db.0pwaf4l.mongodb.net/ioversizeddb?retryWrites=true&w=majority&appName=ioversized-db'
    );
  console.log('MongDB connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

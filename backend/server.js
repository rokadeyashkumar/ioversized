const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000; // Choose your desired port

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = 'mongodb+srv://yash:yash0000@ioversized-db.0pwaf4l.mongodb.net/?retryWrites=true&w=majority&appName=ioversized-db';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  // Start server after successful connection
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})
.catch(err => console.log(err));

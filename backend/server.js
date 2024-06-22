const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000; // Choose your desired port

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = 'mongodb+srv://<username>:<password>@<cluster-address>/<database-name>?retryWrites=true&w=majority';
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

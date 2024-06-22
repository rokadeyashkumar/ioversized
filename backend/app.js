const express = require('express');
const connectDB = require('./config/db.js');
const Customer = require('./models/customer.js');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
// Connect to the database
connectDB();

// Route to get all customers
app.get('/', async (req, res) => {
  try {
    const response = await Customer.find();
    return res.json({ items: response });
  } catch (error) {
    console.error(`Error fetching customers: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to get a customer by ID
app.get('/api/customers/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    return res.json(customer);
  } catch (error) {
    console.error(`Error fetching customer: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

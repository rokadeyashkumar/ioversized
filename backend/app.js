const express = require('express');
const connectDB = require('./config/db.js');
const Customer = require('./models/customer.js');
const Admin = require('./models/admin.js'); // Import Admin model
const cors = require('cors');
const bcrypt = require('bcryptjs'); // For password comparison
const jwt = require('jsonwebtoken'); // For generating tokens

const app = express();
app.use(express.json());
app.use(cors());

// Connect to the database
connectDB();

// Helper function to format the date
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Route to get all customers
app.get('/', async (req, res) => {
  try {
    const response = await Customer.find();
    const formattedResponse = response.map(customer => ({
      ...customer._doc,
      dob: formatDate(customer.dob)
    }));
    const prettyResponse = JSON.stringify({ items: formattedResponse }, null, 2); // Pretty print with 2 spaces
    return res.header('Content-Type', 'application/json').send(prettyResponse);
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
    const formattedCustomer = {
      ...customer._doc,
      dob: formatDate(customer.dob)
    };
    return res.json(formattedCustomer);
  } catch (error) {
    console.error(`Error fetching customer: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to register a new customer
app.post('/api/customers/register', async (req, res) => {
  const { name, dob, email, number, password, confirmPassword } = req.body;

  if (!name || !dob || !email || !number || !password || password !== confirmPassword) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  try {
    const newCustomer = new Customer({
      name,
      dob,
      email,
      number,
      password,
    });

    await newCustomer.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to login a customer
app.post('/api/customers/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.findOne({ email, password });
    if (!customer) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ customerId: customer._id, customerName: customer.name });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add a secret for JWT
const JWT_SECRET = 'your_jwt_secret';

// Route to login an admin
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ Username: username });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.Password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a token if login is successful
    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, admin: { username: admin.Username } });
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
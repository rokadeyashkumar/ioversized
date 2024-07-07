const express = require('express');
const connectDB = require('./config/db.js');
const Customer = require('./models/customer.js');
const Admin = require('./models/admin.js');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    const prettyResponse = JSON.stringify({ items: formattedResponse }, null, 2);
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
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCustomer = new Customer({
      name,
      dob,
      email,
      number,
      password: hashedPassword,
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
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ customerId: customer._id, customerName: customer.name });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add a secret for JWT
const JWT_SECRET = '484ed,pdcksuc()jixj5c8neifhHxonedi!bcdu[]nibd{}bcuinaelfhnecfheiofncf';

// Route to login an admin
app.post('/api/admins/login', async (req, res) => {
  const { adminid, password } = req.body;

  try {
    const admin = await Admin.findOne({ adminid });
    if (!admin) {
      return res.status(401).json({ message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ adminid: admin.adminid }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ status: "ok", data: token });
  } catch (error) {
    console.error('Error logging in admin:', error);
    res.status(500).json({ status: "error", error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

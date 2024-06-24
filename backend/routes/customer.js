const express = require('express');
const router = express.Router();
const Customer = require('../models/customer.js');

// Route to get all customers
router.get('/', async (req, res) => {
  try {
    const response = await Customer.find();
    return res.json({ items: response });
  } catch (error) {
    console.error(`Error fetching customers: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to get a customer by ID
router.get('/:id', async (req, res) => {
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

// Route to register a new customer
router.post('/register', async (req, res) => {
  const { name, dob, email, number, password, confirmPassword } = req.body;

  // Basic validation
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
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

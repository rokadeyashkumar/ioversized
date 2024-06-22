// backend/routes/customer.js
const express = require('express');
const router = express.Router();
const Customer = require('../models/customer.js');

// @route   POST /api/customers/register
// @desc    Register a new customer
// @access  Public
router.post('/register', async (req, res) => {
  const { name, dob, email, number, password } = req.body;

  try {
    // Check if customer already exists by email (you may adjust this validation as needed)
    let customer = await Customer.findOne({ email });

    if (customer) {
      return res.status(400).json({ msg: 'Customer already exists' });
    }

    // Create new customer instance
    customer = new Customer({
      name,
      dob,
      email,
      number,
      password,
    });

    // Save customer to MongoDB
    await customer.save();

    res.status(201).json({ msg: 'Customer registered successfully' });
  } catch (error) {
    console.error('Error registering customer:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: String, required: true },
  password: { type: String, required: true },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;

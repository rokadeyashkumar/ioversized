const Admin = require('../models/admin');
// const bcrypt = require('bcryptjs');

const getAdmin = async (req, res) => {
  try {
      const admin = await Admin.findById(req.params.id);
      if (!admin) {
          return res.status(404).json({ message: 'Customer not found' });
      }
      res.json(admin);
  } catch (error) {
      console.error('Error fetching customer:', error.message);
      res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAdmin
};

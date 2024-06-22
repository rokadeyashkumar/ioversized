const Customer = require('../models/customer');

const getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(customer);
    } catch (error) {
        console.error('Error fetching customer:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getCustomer
};

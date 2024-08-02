const admins = require("../models/adminSchema");

exports.adminLogin = async (req, res) => {
    const { adminID, uniqID, password } = req.body;

    if (!adminID || !uniqID || !password) {
        return res.status(400).json({ error: "Please Enter All Input Data" });
    }

    try {
        const admin = await admins.findOne({ adminID: adminID });

        if (!admin) {
            return res.status(400).json({ error: "Admin not found" });
        }

        if (admin.password !== password) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const token = await admin.generateAuthToken();

        return res.status(200).json({ message: "Admin login successfully done", adminToken: token });
    } catch (error) {
        return res.status(400).json({ error: "Invalid Details", error });
    }
};

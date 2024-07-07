const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/admin');
const dotenv = require('dotenv');

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const adminId = '!ioversized@yash!'; // Replace with desired admin ID
  const password = '!ioversized@yash!'; // Replace with desired password

  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = new Admin({
    adminId,
    password: hashedPassword,
  });

  await newAdmin.save();
  console.log('Admin created successfully');
  mongoose.disconnect();
};

createAdmin().catch(err => console.error(err));

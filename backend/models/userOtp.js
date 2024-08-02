const mongoose = require("mongoose");
const validator = require("validator");

const userOtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, // Corrected spelling
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Not Valid Email");
      }
    },
  },
  otp: {
    type: String,
    required: true, // Corrected spelling
  },
});

// user otp model
const userOtp = new mongoose.model("userotps", userOtpSchema);

module.exports = userOtp;

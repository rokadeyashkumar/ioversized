const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRECT_KEY = "abcdefghijklmnop"; // Consider moving this to environment variables

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Not Valid Email, please enter valid email");
            }
        }
    },
    number: {
        type: Number,
        required: true,
        validate(value) {
            if (value.toString().length < 10) {
                throw new Error("Number must be at least 10 digits long");
            }
        }
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]
});

// token generate
userSchema.methods.generateAuthToken = async function() { // Ensure consistency in method names
    try {
        let newtoken = jwt.sign({ _id: this._id }, SECRECT_KEY, {
            expiresIn: "1d"
        });

        this.tokens = this.tokens.concat({ token: newtoken });
        await this.save();
        return newtoken;

    } catch (error) {
        console.error("Error generating auth token:", error); // Log error for debugging
        throw new Error(error); // Throw error instead of using res
    }
}

// Creating model
const users = mongoose.model("users", userSchema);

module.exports = users;

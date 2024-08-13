const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const SECRECT_KEY = "abcdefghijklmnop";

const adminSchema = new mongoose.Schema({
    adminID: {
        type: String,
        required: true,
        unique: true
    },
    uniqID: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

// Token generation
adminSchema.methods.generateAuthToken = async function () {
    try {
        let newToken = jwt.sign({ _id: this._id }, SECRECT_KEY, { expiresIn: "1d" });
        this.tokens = this.tokens.concat({ token: newToken });
        await this.save();
        return newToken;
    } catch (error) {
        console.log(error);
    }
};

const admins = mongoose.model("admins", adminSchema);
module.exports = admins;
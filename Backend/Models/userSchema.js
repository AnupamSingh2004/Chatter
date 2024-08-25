const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId: String,
    displayName: String,
    email: String,
    image: String,
    color: {
        type: Number,
        required: false
    },
    profileSetup: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});


const userdb = new mongoose.model("users", userSchema);

module.exports = userdb;
const mongoose = require("mongoose");

// Define User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Full name
    email: { type: String, required: true, unique: true }, // Email address
    phone: { type: String, required: true }, // Phone number
    password: { type: String, required: true }, // Password
});

// Create User Model
const User = mongoose.model("User", userSchema);

module.exports = User;

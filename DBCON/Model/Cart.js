const mongoose = require('mongoose');

// Define the schema for the shopping cart
const cartSchema = new mongoose.Schema({
    productName: { type: String, required: true }, // Name of the product (e.g., Double Wick Candle)
    quantity: { type: Number, required: true, default: 1 }, // Quantity of the product
    price: { type: Number, required: true }, // Price per item (e.g., 300)
    image: { type: String, required: true }, // URL of the product image
    total: { type: Number, required: true }, // Total price for the product (quantity * price)
});

// Pre-save hook to calculate the total based on quantity and price
cartSchema.pre('save', function (next) {
    this.total = this.quantity * this.price; // Automatically calculate the total price
    next();
});

// Create the Cart model
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;

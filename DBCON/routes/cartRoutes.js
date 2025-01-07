const express = require('express');
const Cart = require('../Model/Cart'); 

const router = express.Router();

router.post('/cart', async (req, res) => {
    const { productName, quantity, price, image } = req.body;

    if (!productName || !price || !image) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const existingItem = await Cart.findOne({ productName });

        if (existingItem) {
 
            existingItem.quantity += quantity || 1;
            existingItem.total = existingItem.quantity * existingItem.price; 
            await existingItem.save();
            return res.status(200).json({ message: 'Item quantity updated successfully' });
        }

        const newCartItem = new Cart({
            productName,
            quantity: quantity || 1,
            price,
            image,
            total: (quantity || 1) * price,
        });

        await newCartItem.save();
        res.status(200).json({ message: 'Item added to cart successfully' });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Error adding to cart', error: error.message });
    }
});

router.get('/cart', async (req, res) => {
    try {
        const cartItems = await Cart.find();
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Error fetching cart items', error: error.message });
    }
});

router.patch('/cart/:id', async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
        return res.status(400).json({ message: 'Invalid quantity value' });
    }

    try {
        const cartItem = await Cart.findById(id);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        cartItem.quantity = quantity;
        cartItem.total = cartItem.price * quantity; 
        await cartItem.save();

        res.status(200).json({ message: 'Quantity updated successfully', cartItem });
    } catch (error) {
        console.error('Error updating quantity:', error);
        res.status(500).json({ message: 'Error updating quantity', error: error.message });
    }
});


router.delete('/cart/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const cartItem = await Cart.findByIdAndDelete(id);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Item removed successfully' });
    } catch (error) {
        console.error('Error removing item:', error);
        res.status(500).json({ message: 'Error removing item', error: error.message });
    }
});

module.exports = router;

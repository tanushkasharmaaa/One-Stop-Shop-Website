const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../Model/Model'); 

const router = express.Router();

router.get('/test', (req, res) => {
    res.send('Auth route is working!');
});

router.post('/signup', async (req, res) => {
    const { name, email, phone, password, confirmPassword } = req.body;

    try {
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, phone, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({
            message: 'Login successful',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;

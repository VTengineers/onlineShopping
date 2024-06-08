// routes/users.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Require bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Require jsonwebtoken for generating tokens
const User = require('../models/User'); // Adjust the import for your User model

// POST /api/users/register
router.post('/register', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

// POST /api/users/login
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password is correct
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // If credentials are correct, generate a token
        const token = jwt.sign({ email: user.email, userId: user._id }, 'secret_key', {
            expiresIn: '1h' // Token expires in 1 hour
        });

        // Redirect to index.html or send token in response
        res.status(200).json({
            message: 'Login successful',
            token: token
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

module.exports = router;

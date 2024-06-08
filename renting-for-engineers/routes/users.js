const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to register a new user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = new User({
            name,
            email,
            password
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

module.exports = router;

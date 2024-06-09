const express = require('express');
const router = express.Router();
const Renter = require('../models/Renter');

// POST /api/renters
router.post('/', async (req, res) => {
    try {
        const { itemName, description, ratePerHour, lessorName, lessorMobileNumber, lessorAddress, idCardNumber } = req.body;

        const newRenter = new Renter({
            itemName,
            description,
            ratePerHour,
            lessorName,
            lessorMobileNumber,
            lessorAddress,
            idCardNumber
        });

        await newRenter.save();
        res.status(201).json({ message: 'Renter registered successfully' });
    } catch (error) {
        console.error('Error registering renter:', error);
        res.status(500).json({ message: 'Error registering renter' });
    }
});

module.exports = router;

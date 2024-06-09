const mongoose = require('mongoose');

const RenterSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    description: { type: String, required: true },
    ratePerHour: { type: Number, required: true },
    lessorName: { type: String, required: true },
    lessorMobileNumber: { type: String, required: true },
    lessorAddress: { type: String, required: true },
    idCardNumber: { type: String, required: true }
}, { collection: 'renters' }); // Specify the collection name 'renters'

module.exports = mongoose.model('Renter', RenterSchema);

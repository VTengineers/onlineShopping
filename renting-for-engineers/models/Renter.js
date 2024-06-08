const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RenterSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  middleName: {
    type: String
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  collegeIdPhoto: {
    type: String  // Store path to the photo file
  },
  collegeIdNumber: {
    type: String,
    required: true,
    unique: true
  },
  hostelAddress: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create model from schema and export it
module.exports = Renter = mongoose.model('renters', RenterSchema);

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  department: {
    type: String,
    required: true
  },
  joiningDate: {
    type: Date,
    required: true
  },
  totalLeave: {
    type: Number,
    default: 20                   // Default leave balance 
  }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);

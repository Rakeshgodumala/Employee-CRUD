
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  role: String,
  type: String,
  dob: String,
  image: String,
});

module.exports = mongoose.model('Employee', EmployeeSchema);

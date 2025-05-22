const bcrypt = require('bcryptjs');
const Employee = require('../models/employee');

// REGISTER
const registerEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      mobile,
      designation,
      gender,
      course,
      phone,
      dob,
      role,
      type
    } = req.body;

    // Check if email already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new Employee({
      name,
      email,
      password: hashedPassword,
      mobile,
      designation,
      gender,
      course,
      phone,
      dob,
      role,
      type,
      image: req.file ? req.file.filename : '',
    });

    await newEmployee.save();
    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// LOGIN
const loginEmployee = async (req, res) => {
  const { email, password } = req.body;
  try {
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', employee });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  registerEmployee,
  loginEmployee,
};

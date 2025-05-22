const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const Employee = require('../models/employee');
const multer = require('multer');
const path = require('path');

// Multer setup 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Routes

// Register new employee with image upload
router.post('/register', upload.single('image'), employeeController.registerEmployee);

// Login employee
router.post('/login', employeeController.loginEmployee);

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get employee by ID
router.get('/:id', async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(emp);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// UPDATE employee by ID with image upload support
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    // Extract fields from body
    const { name, email, phone, role, type, dob, designation, gender, course, mobile } = req.body;
    
    // Prepare update object with fields from request body
    const updateFields = {
      name,
      email,
      phone,
      role,
      type,
      dob,
      designation,
      gender,
      course,
      mobile,
    };

    // Remove undefined fields to avoid overwriting with undefined
    Object.keys(updateFields).forEach(key => updateFields[key] === undefined && delete updateFields[key]);

    // If new image uploaded, set it in update
    if (req.file) {
      updateFields.image = req.file.filename;
    }

    // Update employee document
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, updateFields, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE employee by ID
router.delete('/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

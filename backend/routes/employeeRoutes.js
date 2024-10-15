const express = require('express');
const { createEmployee, getEmployees, getEmployeeById, deleteEmployee, updateEmployee } = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get all employees
router.get('/', authMiddleware(), getEmployees);

// Get an employee by ID
router.get('/:id', authMiddleware(), getEmployeeById);

// Create a new employee
router.post('/', authMiddleware(), createEmployee);

// Update an employee
router.put('/:id', authMiddleware(), updateEmployee);

// Delete an employee
router.delete('/:id', authMiddleware(), deleteEmployee);

module.exports = router;

const express = require('express');
const { createEmployee, getEmployees, getEmployeeById, deleteEmployee, updateEmployee } = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get all employees
router.get('/', authMiddleware(), getEmployees);

// Get an employee by ID
router.get('/:id', authMiddleware(), getEmployeeById);

// Create a new employee
router.post('/', authMiddleware(['Manager', 'Admin']), createEmployee);

// Update an employee
router.put('/:id', authMiddleware(['Manager', 'Admin']), updateEmployee);

// Delete an employee
router.delete('/:id', authMiddleware(['Manager', 'Admin']), deleteEmployee);

module.exports = router;

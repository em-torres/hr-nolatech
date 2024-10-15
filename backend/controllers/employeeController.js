const Employee = require('../models/Employee');

// Create a new employee
exports.createEmployee = async (req, res) => {
    const { name, email, position, department, salary } = req.body;
    try {
        const newEmployee = new Employee({ name, email, position, department, salary });
        await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
    } catch (error) {
        console.error('Error during employee creation:', error);
        res.status(500).json({ error: 'Failed to create employee' });
    }
};

// Get all employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error('Error during employees retrieval:', error);
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
};

// Get a single employee by ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        console.error('Error during employee retrieval:', error);
        res.status(500).json({ error: 'Failed to fetch employee' });
    }
};

// Update an employee by ID
exports.updateEmployee = async (req, res) => {
    const { name, email, position, department, salary } = req.body;
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            { name, email, position, department, salary },
            { new: true, runValidators: true }
        );
        if (!updatedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
    } catch (error) {
        console.error('Error during employee update:', error);
        res.status(500).json({ error: 'Failed to update employee' });
    }
};

// Delete an employee by ID
exports.deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Error during employee deletion:', error);
        res.status(500).json({ error: 'Failed to delete employee' });
    }
};

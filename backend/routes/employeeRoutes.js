const express = require('express');
const { getEmployees } = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware(), getEmployees);

module.exports = router;

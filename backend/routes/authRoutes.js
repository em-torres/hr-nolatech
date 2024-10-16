const express = require('express');
const { registerUser, loginUser, verifyToken } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify', authMiddleware(), verifyToken);


module.exports = router;

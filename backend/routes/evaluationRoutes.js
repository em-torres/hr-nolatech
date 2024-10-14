const express = require('express');
const { createEvaluation, getEvaluation, updateEvaluation } = require('../controllers/evaluationController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware('Manager'), createEvaluation);
router.get('/:id', authMiddleware(), getEvaluation);
router.put('/:id', authMiddleware('Manager'), updateEvaluation);

module.exports = router;

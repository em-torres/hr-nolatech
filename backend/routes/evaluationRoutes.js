const express = require('express');
const { createEvaluation, getEvaluations, getEvaluationById, updateEvaluation, deleteEvaluation  } = require('../controllers/evaluationController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create a new evaluation - Only accessible by Managers
router.post('/', authMiddleware(['Manager', 'Admin']), createEvaluation);

// Get all evaluations - Accessible by all authenticated users
router.get('/', authMiddleware(), getEvaluations);

// Get a specific evaluation by ID - Accessible by all authenticated users
router.get('/:id', authMiddleware(), getEvaluationById);

// Update an evaluation by ID - Only accessible by Managers
router.put('/:id', authMiddleware(['Manager', 'Admin']), updateEvaluation);

// Delete an evaluation by ID - Only accessible by Managers
router.delete('/:id', authMiddleware(['Manager', 'Admin']), deleteEvaluation);


module.exports = router;

const Evaluation = require('../models/Evaluation');

// Create a new evaluation
exports.createEvaluation = async (req, res) => {
    const { title, employee, feedback, score, rating } = req.body;

    try {
        // Check if the employee exists
        const employeeExists = await Employee.findById(employee);
        if (!employeeExists) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        const newEvaluation = new Evaluation({
            title,
            employee,
            feedback,
            score,
            rating,
            evaluator: req.user.id // Assuming req.user contains the logged-in user's data
        });

        await newEvaluation.save();
        res.status(201).json({ message: 'Evaluation created successfully', evaluation: newEvaluation });
    } catch (error) {
        console.error('Error during evaluation creation:', error);
        res.status(500).json({ error: 'Failed to create evaluation' });
    }
};


// Get all evaluations
exports.getEvaluations = async (req, res) => {
    try {
        const evaluations = await Evaluation.find().populate('employee evaluator');
        res.status(200).json(evaluations);
    } catch (error) {
        console.error('Error during evaluations retrieval:', error);
        res.status(500).json({ error: 'Failed to fetch evaluations' });
    }
};

// Get a single evaluation by ID
exports.getEvaluationById = async (req, res) => {
    try {
        const evaluation = await Evaluation.findById(req.params.id).populate('employee evaluator');
        if (!evaluation) {
            return res.status(404).json({ error: 'Evaluation not found' });
        }
        res.status(200).json(evaluation);
    } catch (error) {
        console.error('Error during evaluation retrieval:', error);
        res.status(500).json({ error: 'Failed to fetch evaluation' });
    }
};

// Update an evaluation by ID
exports.updateEvaluation = async (req, res) => {
    const { title, feedback, score, rating } = req.body;

    try {
        const updatedEvaluation = await Evaluation.findByIdAndUpdate(
            req.params.id,
            { title, feedback, score, rating },
            { new: true, runValidators: true }
        );

        if (!updatedEvaluation) {
            return res.status(404).json({ error: 'Evaluation not found' });
        }

        res.status(200).json({ message: 'Evaluation updated successfully', evaluation: updatedEvaluation });
    } catch (error) {
        console.error("Error during evaluation update:", error);
        res.status(500).json({ error: 'Failed to update evaluation' });
    }
};

// Delete an evaluation by ID
exports.deleteEvaluation = async (req, res) => {
    try {
        const deletedEvaluation = await Evaluation.findByIdAndDelete(req.params.id);
        if (!deletedEvaluation) {
            return res.status(404).json({ error: 'Evaluation not found' });
        }
        res.status(200).json({ message: 'Evaluation deleted successfully' });
    } catch (error) {
        console.error("Error during evaluation deletion:", error);
        res.status(500).json({ error: 'Failed to delete evaluation' });
    }
};

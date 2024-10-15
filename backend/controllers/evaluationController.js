const Evaluation = require('../models/Evaluation');

exports.createEvaluation = async (req, res) => {
    const { employee, feedback, score } = req.body;
    try {
        const evaluation = new Evaluation({ employee, feedback, score, evaluator: req.user.id });
        await evaluation.save();
        res.status(201).json(evaluation);
    } catch (error) {
        console.log('Error during evaluation creation:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getEvaluation = async (req, res) => {
    try {
        const evaluation = await Evaluation.findById(req.params.id).populate('employee evaluator');
        if (!evaluation) return res.status(404).json({ error: 'Evaluation not found' });
        res.status(200).json(evaluation);
    } catch (error) {
        console.log('Error during evaluation retrieval:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateEvaluation = async (req, res) => {
    const { feedback, score } = req.body;
    try {
        let evaluation = await Evaluation.findById(req.params.id);
        if (!evaluation) return res.status(404).json({ error: 'Evaluation not found' });

        evaluation.feedback = feedback || evaluation.feedback;
        evaluation.score = score || evaluation.score;

        await evaluation.save();
        res.status(200).json(evaluation);
    } catch (error) {
        console.log('Error during evaluation update:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

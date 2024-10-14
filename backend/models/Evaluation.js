const mongoose = require('mongoose');

const EvaluationSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    feedback: String,
    score: Number,
    evaluator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Evaluation', EvaluationSchema);

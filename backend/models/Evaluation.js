const mongoose = require('mongoose');

const EvaluationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    feedback: {
        type: String,
        required: false
    },
    score: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    evaluator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Evaluation = mongoose.model('Evaluation', EvaluationSchema);
module.exports = Evaluation;

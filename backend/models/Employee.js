const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
        unique: true,
    },
    position: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: false,
    },
    department: {
        type: String,
        required: true,
    },
    evaluations: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Evaluation' }
    ],
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);

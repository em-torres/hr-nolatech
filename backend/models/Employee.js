const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: String,
    position: String,
    department: String,
    evaluations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Evaluation' }]
});

module.exports = mongoose.model('Employee', EmployeeSchema);

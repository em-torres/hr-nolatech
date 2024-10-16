import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EvaluationForm = ({ evaluationId, employeeId }) => {
    const [title, setTitle] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(1);
    const [evaluator, setEvaluator] = useState('');
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch the list of employees when the component loads
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await axios.get('/api/employees');
                setEmployees(res.data);
            } catch (err) {
                console.error('Error fetching employees:', err);
            }
        };
        fetchEmployees();

        if (evaluationId) {
            fetchEvaluation(evaluationId);
        }
    }, [evaluationId]);

    // Fetch an evaluation for editing (if editing)
    const fetchEvaluation = async (id) => {
        try {
            const res = await axios.get(`/api/evaluations/${id}`);
            const evaluation = res.data;
            setTitle(evaluation.title);
            setScore(evaluation.score);
            setFeedback(evaluation.feedback || '');
            setRating(evaluation.rating || 1);
            setEvaluator(evaluation.evaluator._id);
        } catch (err) {
            console.error('Error fetching evaluation:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const data = {
            title,
            employee: employeeId || employees[0]?._id, // Select first employee by default if no specific employeeId
            feedback,
            score,
            rating,
            evaluator: evaluator || employees[0]?._id, // Optionally use the first employee as evaluator
        };

        try {
            if (evaluationId) {
                // If editing an existing evaluation
                await axios.put(`/api/evaluations/${evaluationId}`, data);
                alert('Evaluation updated successfully!');
            } else {
                // If creating a new evaluation
                await axios.post('/api/evaluations', data);
                alert('Evaluation created successfully!');
            }
        } catch (err) {
            setError('Error submitting evaluation');
            console.error('Submission error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="evaluation-form max-w-lg mx-auto p-5 bg-white shadow-md rounded">
            <h2 className="text-2xl mb-5">{evaluationId ? 'Edit Evaluation' : 'New Evaluation'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Evaluation Title"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Score (0-100)</label>
                    <input
                        type="number"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        min="0"
                        max="100"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Feedback</label>
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Provide feedback (optional)"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Rating (1-5)</label>
                    <input
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        min="1"
                        max="5"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Select Employee</label>
                    <select
                        value={evaluator}
                        onChange={(e) => setEvaluator(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        {employees.map((emp) => (
                            <option key={emp._id} value={emp._id}>
                                {emp.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {loading ? 'Submitting...' : evaluationId ? 'Update Evaluation' : 'Create Evaluation'}
                </button>
                {error && <p className="text-red-500 mt-3">{error}</p>}
            </form>
        </div>
    );
};

export default EvaluationForm;

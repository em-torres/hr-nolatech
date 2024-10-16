import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext'; // Assuming you have a context for user info

const Evaluation = () => {
    const { user } = useContext(AuthContext); // Get user info
    const [evaluations, setEvaluations] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // Check if in edit mode
    const [evaluationData, setEvaluationData] = useState({
        title: '',
        score: 0,
        feedback: '',
        rating: 1,
        employee: '', // Will be required for Admin/Manager
    });

    // Fetch evaluations when the component loads
    useEffect(() => {
        fetchEvaluations();
    }, []);

    const fetchEvaluations = async () => {
        try {
            const res = await axios.get('/api/evaluations', {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setEvaluations(res.data);
        } catch (err) {
            console.error('Failed to fetch evaluations:', err);
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        setEvaluationData({ ...evaluationData, [e.target.name]: e.target.value });
    };

    // Create or update evaluation based on form mode (Admin/Manager only)
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            if (isEditing) {
                // Update existing evaluation
                await axios.put(`/api/evaluations/${evaluationData._id}`, evaluationData, config);
            } else {
                // Create new evaluation
                await axios.post('/api/evaluations', evaluationData, config);
            }
            setEvaluationData({ title: '', score: 0, feedback: '', rating: 1, employee: '' });
            setIsEditing(false);
            fetchEvaluations(); // Refresh the list
        } catch (err) {
            console.error('Error saving evaluation:', err);
        }
    };

    // Start editing an evaluation
    const handleEditClick = (evaluation) => {
        setEvaluationData(evaluation);
        setIsEditing(true);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Evaluations</h1>

            {user.role === 'Admin' || user.role === 'Manager' ? (
                <div>
                    {/* Form for Admin/Manager to create or edit evaluations */}
                    <form onSubmit={handleFormSubmit} className="mb-6">
                        <div>
                            <label className="block text-gray-700">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={evaluationData.title}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Score (0-100)</label>
                            <input
                                type="number"
                                name="score"
                                value={evaluationData.score}
                                onChange={handleInputChange}
                                min="0"
                                max="100"
                                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Feedback</label>
                            <textarea
                                name="feedback"
                                value={evaluationData.feedback}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Rating (1-5)</label>
                            <input
                                type="number"
                                name="rating"
                                value={evaluationData.rating}
                                onChange={handleInputChange}
                                min="1"
                                max="5"
                                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                            />
                        </div>
                        {user.role === 'Admin' && (
                            <div>
                                <label className="block text-gray-700">Employee</label>
                                <input
                                    type="text"
                                    name="employee"
                                    value={evaluationData.employee}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-md p-2 mb-4"
                                    required
                                />
                            </div>
                        )}
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            {isEditing ? 'Update Evaluation' : 'Create Evaluation'}
                        </button>
                    </form>
                </div>
            ) : null}

            {/* Employee can see their evaluations */}
            {user.role === 'Employee' && (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Your Evaluations</h2>
                    {evaluations.length ? (
                        <ul>
                            {evaluations.map((evaluation) => (
                                <li key={evaluation._id} className="mb-4">
                                    <h3 className="text-xl font-semibold">{evaluation.title}</h3>
                                    <p>Score: {evaluation.score}</p>
                                    <p>Rating: {evaluation.rating}</p>
                                    <p>Feedback: {evaluation.feedback}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No evaluations found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Evaluation;

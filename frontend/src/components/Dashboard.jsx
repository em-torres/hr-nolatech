import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext'; // Assuming you have an AuthContext
import axios from 'axios';

const Dashboard = () => {
    const { user } = useContext(AuthContext); // Access the user object from context
    const [employees, setEmployees] = useState([]);
    const [evaluations, setEvaluations] = useState([]);

    useEffect(() => {
        // Fetch employees and evaluations based on user role
        if (user.role === 'Admin' || user.role === 'Manager') {
            fetchEmployees();
        }
        if (user.role === 'Employee') {
            fetchEvaluations();
        }
    }, [user]);

    const fetchEmployees = async () => {
        try {
            const res = await axios.get('/api/employees', {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setEmployees(res.data);
        } catch (err) {
            console.error('Failed to fetch employees:', err);
        }
    };

    const fetchEvaluations = async () => {
        try {
            const res = await axios.get(`/api/evaluations/employee/${user.id}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setEvaluations(res.data);
        } catch (err) {
            console.error('Failed to fetch evaluations:', err);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            {user.role === 'Admin' || user.role === 'Manager' ? (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Employee List</h2>
                    {employees.length ? (
                        <ul>
                            {employees.map((employee) => (
                                <li key={employee._id} className="mb-2">
                                    {employee.name} - {employee.role}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No employees found.</p>
                    )}
                </div>
            ) : (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Your Evaluations</h2>
                    {evaluations.length ? (
                        <ul>
                            {evaluations.map((evaluation) => (
                                <li key={evaluation._id} className="mb-2">
                                    {evaluation.title} - Score: {evaluation.score}
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

export default Dashboard;

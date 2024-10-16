// src/context/AuthContext.js
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check for token in localStorage on load
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Verify the token with the backend
            axios.get('http://localhost:5000/api/auth/verify', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    // Set the token in axios headers
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    // Set the user state with the response data
                    setUser(response.data.user);
                })
                .catch(() => {
                    // If token verification fails, remove the token
                    localStorage.removeItem('token');
                    setUser(null);
                });
        }
    }, []);

    const login = async (username, password) => {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
            username,
            password
        });
        const token = response.data.token;
        localStorage.setItem('token', token);  // Store the token in localStorage
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;  // Set the token in axios headers
        setUser(response.data.user);  // Update the user state
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
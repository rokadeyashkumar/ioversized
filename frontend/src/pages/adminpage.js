// frontend/src/pages/adminloginpage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../contexts/adminauthcontext';

const AdminLoginPage = () => {
    const [adminId, setAdminId] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useAdminAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signIn(adminId, password);
            navigate('/admin/dashboard');
        } catch (error) {
            setError('wrong data.');
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    placeholder="Admin ID"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default AdminLoginPage;

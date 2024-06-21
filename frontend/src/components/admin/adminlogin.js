// frontend/src/components/admin/adminlogin.js

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AdminLogin = () => {
    const history = useHistory();
    const [adminName, setAdminName] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        // Implement authentication logic here
        if (adminName === 'yash-ioversized' && adminPassword === 'yash21022003') {
            // Navigate to Admin Dashboard upon successful login
            history.push('/admin/dashboard');
        } else {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="admin-login">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Admin Name:</label>
                    <input type="text" value={adminName} onChange={(e) => setAdminName(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default AdminLogin;

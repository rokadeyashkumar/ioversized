// frontend/src/components/auth/login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const history = useHistory();
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        // Form validation
        if (!emailOrPhone || !password) {
            setError('Please enter email/phone and password.');
            return;
        }

        // Prepare login data to send to backend API
        const loginData = {
            emailOrPhone,
            password,
        };

        try {
            // Example POST request to authenticate user
            const response = await axios.post('http://localhost:5000/api/login', loginData);
            console.log('User logged in:', response.data);
            // Clear form after successful login
            setEmailOrPhone('');
            setPassword('');
            setError('');
            // Redirect to home page or dashboard after login
            history.push('/');
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email or Phone:</label>
                    <input type="text" value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default Login;

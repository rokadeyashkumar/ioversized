// frontend/src/components/auth/forgetpassword.js

import React, { useState } from 'react';
import axios from 'axios';

const ForgetPassword = () => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleReset = async (e) => {
        e.preventDefault();
        // Form validation
        if (!emailOrPhone) {
            setError('Please enter email/phone.');
            return;
        }

        // Prepare reset data to send to backend API
        const resetData = {
            emailOrPhone,
        };

        try {
            // Example POST request to reset password
            const response = await axios.post('http://localhost:5000/api/reset-password', resetData);
            console.log('Password reset:', response.data);
            setMessage('Password reset link sent. Check your email/phone.');
            setError('');
            // Clear form after sending reset link
            setEmailOrPhone('');
        } catch (error) {
            console.error('Error resetting password:', error);
            setError('Failed to reset password. Please try again later.');
        }
    };

    return (
        <div className="forget-password">
            <h2>Forget Password</h2>
            <form onSubmit={handleReset}>
                <div>
                    <label>Email or Phone:</label>
                    <input type="text" value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} />
                </div>
                <button type="submit">Reset Password</button>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default ForgetPassword;

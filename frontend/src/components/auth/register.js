// frontend/src/components/auth/register.js

import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [city, setCity] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        // Form validation
        if (!fullName || !email || !password || !confirmPassword || !city || !gender || !dateOfBirth) {
            setError('Please fill out all fields.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Prepare user data to send to backend API
        const userData = {
            fullName,
            email,
            password,
            city,
            gender,
            dateOfBirth,
        };

        try {
            // Example POST request to register user
            const response = await axios.post('http://localhost:5000/api/register', userData);
            console.log('User registered:', response.data);
            // Clear form after successful registration
            setFullName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setCity('');
            setGender('');
            setDateOfBirth('');
            setError('');
            // Redirect to login page after registration
            window.location.href = '/login';
        } catch (error) {
            console.error('Error registering user:', error);
            setError('Failed to register user. Please try again later.');
        }
    };

    return (
        <div className="register">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Full Name:</label>
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div>
                    <label>City:</label>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div>
                    <label>Gender:</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <label>Date of Birth:</label>
                    <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                </div>
                <button type="submit">Register</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default Register;

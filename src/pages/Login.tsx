import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../redux/slices/authSlice'; // Import the action

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Use dispatch to set access token
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://music-backend-1z2z.onrender.com/api/auth/login',
                { email, password },
                {
                    withCredentials: true, // Ensure credentials (cookies) are included in the request
                    headers: {
                        'Content-Type': 'application/json', // Ensure the content type is set
                    },
                }
            );

            // Check if the response contains the access token
            if (response.data && response.data.accessToken) {
                // Dispatch action to set access token in Redux store
                dispatch(setAccessToken(response.data.accessToken));

                // Redirect to the homepage or dashboard after successful login
                navigate('/');
            } else {
                setError('Authentication failed. No token received.');
            }
        } catch (err: any) {
            // Check if error response exists and handle it
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

import React from 'react';
import { Navigate } from 'react-router-dom';
import Sidebar from './SideBar';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = localStorage.getItem('accessToken');

    // Add logging to verify the token
    console.log('Access Token:', token);

    return token ? (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ flex: 1, padding: '1rem' }}>{children}</div>
        </div>
    ) : (
        <Navigate to="/login" />
    );
};

export default ProtectedRoute;

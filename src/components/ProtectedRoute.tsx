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

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true); // You can change this logic based on your requirement

  return token ? (
    <div
      style={{
        display: 'flex',
        margin: 0,
        padding: 0,
        alignItems: 'stretch',
        position: 'relative',
         // Ensure full height for scrollable content
      }}
    >
      {/* Sidebar with conditional styling */}
      <Sidebar isOpen={isSidebarOpen} />
      <div
        style={{
          flex: 1,
          padding: '1rem', // Added padding to make the layout look better
          position: 'relative',
          zIndex: isSidebarOpen ? 1 : 0, // Ensures children are on top when sidebar is open
          overflowY: 'auto', // Makes the children scrollable
          height: '100vh', // Full height to allow scrolling
        }}
      >
        {children}
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;

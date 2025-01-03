import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Adjust based on your store setup
import Sidebar from './SideBar';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Access the token from Redux store
  const token = useSelector((state: RootState) => state.auth.accessToken);

  // Sidebar state management
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  // Log the token for debugging purposes
  console.log('Access Token:', token);

  return token ? (
    <div
      style={{
        display: 'flex',
        margin: 0,
        padding: 0,
        alignItems: 'stretch',
        position: 'relative',
      }}
    >
      {/* Sidebar with conditional styling */}
      <Sidebar    />
      <div
        style={{
          flex: 1,
          padding: '1rem',
          position: 'relative',
          zIndex: isSidebarOpen ? 1 : 0,
          overflowY: 'auto',
          height: '100vh',
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

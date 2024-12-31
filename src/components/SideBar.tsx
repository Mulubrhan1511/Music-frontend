import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaGreaterThan, FaLessThan } from 'react-icons/fa';

// Sidebar Container
const SidebarContainer = styled.div<{ isOpen: boolean }>`
  width: ${(props) => (props.isOpen ? '250px' : '0')};
  height: 100vh;
  background-color: ${(props) => (props.isOpen ? '#87CEEB' : 'transparent')}; /* Sky blue color */
  color: white;
  display: flex;
  flex-direction: column;
  padding: ${(props) => (props.isOpen ? '1rem' : '0')};
  transition: width 0.3s, padding 0.3s;
  position: fixed;
  left: 0;
  top: 0;
  z-index: ${(props) => (props.isOpen ? 1000 : -1)};
  pointer-events: ${(props) => (props.isOpen ? 'auto' : 'none')};

  /* Show sidebar and content side by side on larger screens */
  @media (min-width: 768px) {
    position: static;
    width: 250px;
    height: auto;
  }
`;

// Toggle Button
const ToggleButton = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 1rem;
  left: 0;
  background-color: #2c3e50;
  color: white;
  border: none;
  cursor: pointer;
  z-index: 1100;
  padding: 0.5rem;
  border-radius: 50%;
  transition: left 0.3s;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #3498db;
  }

  /* Hide button on larger screens */
  @media (min-width: 768px) {
    display: none;
  }
`;

// Sidebar Item
const SidebarItem = styled.div`
  margin: 1rem 0;
  font-size: 1.2rem;
  text-transform: uppercase;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(52, 152, 219, 0.3); /* Light blue hover effect */
    cursor: pointer;
    color: #3498db;
  }
`;

// Sidebar Link
const SidebarLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-weight: bold;
  display: block;
`;

// Sidebar Component
const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* Toggle Button */}
      <ToggleButton isOpen={isOpen} onClick={toggleSidebar}>
        {isOpen ? <FaLessThan /> : <FaGreaterThan />}
      </ToggleButton>

      {/* Sidebar */}
      <SidebarContainer isOpen={isOpen}>
        <SidebarItem>
          <SidebarLink to="/">Home</SidebarLink>
        </SidebarItem>
        <SidebarItem>
          <SidebarLink to="/songs">Songs List</SidebarLink>
        </SidebarItem>
        <SidebarItem>
          <SidebarLink to="/add-song">Add New Song</SidebarLink>
        </SidebarItem>
        <SidebarItem>
          <SidebarLink to="/statistics">Statistics</SidebarLink>
        </SidebarItem>
        <SidebarItem>
          <SidebarLink to="/genres">Genres</SidebarLink>
        </SidebarItem>
        <SidebarItem>
          <SidebarLink to="/artists">Artists</SidebarLink>
        </SidebarItem>
        <SidebarItem>
          <SidebarLink to="/albums">Albums</SidebarLink>
        </SidebarItem>
        <SidebarItem>
          <SidebarLink to="/logout">Logout</SidebarLink>
        </SidebarItem>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;

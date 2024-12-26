import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaBars } from 'react-icons/fa';

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  width: ${(props) => (props.isOpen ? '250px' : '0')};
  height: 100vh;
  background-color: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
  padding: ${(props) => (props.isOpen ? '1rem' : '0')};
  transition: width 0.3s, padding 0.3s;
  overflow: hidden;
`;

const ToggleButton = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 0.1rem;
  left: ${(props) => (props.isOpen ? '250px' : '1rem')};
  background-color: #2c3e50;
  color: white;
  border: none;
  cursor: pointer;
  z-index: 1100;
  padding: 0.5rem;
  border-radius: 4px;
  transition: left 0.3s;

  &:hover {
    background-color: #3498db;
  }

  /* Media query to hide button on larger screens */
  @media (min-width: 768px) {
    display: none;
  }
`;

const SidebarItem = styled.div`
  margin: 1rem 0;
  font-size: 1.2rem;
  &:hover {
    color: #3498db;
    cursor: pointer;
  }
`;

const SidebarLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* Toggle Button */}
      <ToggleButton isOpen={isOpen} onClick={toggleSidebar}>
        <FaBars />
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

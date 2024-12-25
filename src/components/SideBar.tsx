import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  transition: width 0.3s;

  @media (max-width: 768px) {
    width: 60px; /* Collapsed width */
    overflow: hidden; /* Hide overflow */
  }
`;

const SidebarItem = styled.div`
  margin: 1rem 0;
  font-size: 1.2rem;
  &:hover {
    color: #3498db;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    font-size: 1rem; /* Smaller font size for collapsed view */
    text-align: center; /* Center text */
  }
`;

const SidebarLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center; /* Center items vertically */
  height: 100%; /* Full height for clickable area */

  @media (max-width: 768px) {
    justify-content: center; /* Center items in collapsed view */
  }
`;

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
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
  );
};

export default Sidebar;

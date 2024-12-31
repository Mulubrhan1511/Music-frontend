import React from 'react';
import styled from '@emotion/styled';

const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5; /* Light background color */
  color: #2c3e50; /* Dark text color */
  font-family: Arial, sans-serif;
  text-align: center;
`;

const Message = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #e74c3c; /* Red color for emphasis */
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d; /* Lighter gray color */
  margin-bottom: 2rem;
`;

const GoHomeButton = styled.a`
  padding: 0.8rem 1.6rem;
  font-size: 1rem;
  color: white;
  background-color: #3498db; /* Blue color */
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9; /* Darker blue on hover */
  }
`;

const NotFound: React.FC = () => {
  return (
    <NotFoundContainer>
      <div>
        <Message>404</Message>
        <Description>Sorry, the page you are looking for cannot be found.</Description>
        <GoHomeButton href="/">Go to Homepage</GoHomeButton>
      </div>
    </NotFoundContainer>
  );
};

export default NotFound;

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  padding: 0 2rem;
`;

const NotFoundTitle = styled.h1`
  font-size: 8rem;
  margin: 0;
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 5rem;
  }
`;

const NotFoundSubtitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #ddd;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const NotFoundText = styled.p`
  color: #aaa;
  font-size: 1.2rem;
  margin-bottom: 3rem;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HomeButton = styled(Link)`
  padding: 0.8rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 30px;
  transition: all 0.3s ease;
  background: var(--gradient);
  color: white;
  box-shadow: 0 5px 15px rgba(144, 132, 112, 0.4);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(90, 80, 64, 0.6);
  }
`;

const NotFound: React.FC = () => {
  return (
    <NotFoundContainer>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundSubtitle>Not Found</NotFoundSubtitle>
      <NotFoundText>
        The page may not exist, have been moved, or have been deleted.
      </NotFoundText>
      <HomeButton to="/">Go Home</HomeButton>
    </NotFoundContainer>
  );
};

export default NotFound; 